import { React, useState, useEffect, useReducer, useLayoutEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
// import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChartSettings from './ChartSettings'
import { fetchPriceData, fetchDividendData } from '../../../../shared/functions/requests'
import { format, compareAsc } from "date-fns";
import _ from 'lodash'

import {
    Paper,
    Grid,
    Typography,
    IconButton,
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(1),
    },
    header: {
        height: '30%',
        padding: theme.spacing(2),
    },
    chart: {
        padding: theme.spacing(1),
        height: '70%',
    },

    chip: {
        marginTop: theme.spacing(3),
        margin: theme.spacing(2),
    }

}));

const CustomTooltip = props => {
    const { active, payload,label } = props;
    if (active) {
        return (
            <div>
                <p>
                    {label ? format(label, "yyyy-MM-dd") : " -- "}
                </p>
                <div>
                    {payload && payload.map(pld => {
                        return (
                            <p>{pld.dataKey}:
                                {pld ? pld.payload[pld.dataKey].toFixed(2) : " -- "}</p>)
                    })
                    }
                </div>
            </div>
        );
    }

    return null;
};


function BarChart_(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const [configOpen, setConfigOpen] = useState(false);
    const [charts, setCharts] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const theme = useTheme();



    const saveSettings = (settings) => {
        let title_ = ''
        let charts_ = []
        let promises = settings.map(s => {
            setSubtitle(s.period)
            charts_.push({ name: s.name, type: s.type, pos: s.pos, color: s.color })
            title_ = title_ !== '' ? title_ + ' | ' + _.capitalize(s.name) : _.capitalize(s.name)
            switch (s.name) {
                case "price": {
                    return fetchPriceData(ticker, s.period, token)
                }
                case "dividend": {
                    return fetchDividendData(ticker, s.period, token)
                }
            }
        })
        Promise.allSettled(promises).
            then((results) => {
                let chartsData_ = {}
                results.forEach(r => {
                    if (r.status === "fulfilled") {
                        switch (r.value.type) {
                            case "price": {
                                r.value.PriceHistory.forEach(p => {
                                    let date = new Date(p.date.year, p.date.month, p.date.dayOfMonth)
                                    let data = chartsData_[date.getTime()] || { date: date }
                                    data.price = p.close
                                    chartsData_[date.getTime()] = data
                                })
                                break
                            }
                            case "dividend": {
                                r.value.PriceHistory.forEach(p => {
                                    let date = new Date(p.date.year, p.date.month, p.date.dayOfMonth)
                                    let data = chartsData_[date.getTime()] || { date: date }
                                    data.dividend = p.adjDividend
                                    chartsData_[date.getTime()] = data
                                })
                                break

                            }
                        }
                    }
                })
                setTitle(title_)
                setChartsData(Object.values(chartsData_).sort((c1, c2) => compareAsc(c1.date, c2.date)))
                setCharts([...charts_])
            }
            );

    }

    const dateFormatter = date => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    return (

        <div className={classes.root}>
            <span className="grid-menu">
                <IconButton size="small" onClick={() => setConfigOpen(!configOpen)} >
                    <SettingsIcon fontSize="small" />

                </IconButton>
                <IconButton size="small" onClick={() => props.onRemoveItem(props.i)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </span>
            <ChartSettings open={configOpen} saveSettings={saveSettings}></ChartSettings>
            <div className={classes.header}>
                <Grid
                    justify="space-between"
                    alignItems="flex-start"
                    container spacing={1}>
                    <Grid xs={6} >
                        <Typography variant="subtitle1">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Last {subtitle} Days
                        </Typography>

                    </Grid>

                </Grid>
            </div>

            <div className={classes.chart}>
                {(chartsData.length > 0 && charts.length > 0) &&
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={chartsData}
                            type="number"
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="date" tickFormatter={dateFormatter} hide />
                            <YAxis
                                domain={[dataMin => (0.95 * dataMin), dataMax => (1.05 * dataMax)]}
                                yAxisId="right"
                                orientation="right"
                                hide
                            />
                            <YAxis
                                domain={[dataMin => (0.95 * dataMin), dataMax => (1.05 * dataMax)]}
                                yAxisId="left"
                                orientation="left"
                                hide
                            />
                            <Tooltip content={<CustomTooltip />} />
                            {/* <Legend /> */}
                            {charts.map(el => {
                                if (el.type === 'bar') {
                                    return <Bar
                                        key={el.name}
                                        dataKey={el.name}
                                        barSize={300}
                                        fill={el.color}
                                        yAxisId={el.pos}
                                        name={el.name} />
                                } else if (el.type === 'line') {
                                    return <Line
                                        key={el.name}
                                        dataKey={el.name}
                                        stroke={el.color}
                                        strokeWidth={2}
                                        dot={false}
                                        yAxisId={el.pos}
                                        connectNulls />
                                }
                            })}

                        </ComposedChart>
                    </ResponsiveContainer>
                }

            </div>
        </div>
    )
}





export default function MultichartsCard(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>
                <BarChart_ key={props.i} {...props} />
            </Paper>
        )
    })

}