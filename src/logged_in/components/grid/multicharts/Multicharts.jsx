import { React, useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';

// import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartSettings from './ChartSettings'
import { fetchPriceData, fetchDividendData, fetchFinancialHistory } from '../../../../shared/functions/requests'
import { format, compareAsc } from "date-fns";
import _ from 'lodash'
import Card from '../Card'

import {
    Paper,
    Grid,
    Typography,
} from "@material-ui/core";

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
    const { active, payload, label } = props;
    if (active) {
        return (
            <div>
                <p>
                    {label ? format(label, "yyyy-MM-dd") : " -- "}
                </p>
                <div>
                    {payload && payload.map(pld => {
                        return (
                            <p key={pld.dataKey}>{pld.dataKey}:
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
    // const { t } = useTranslation();
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const [configOpen, setConfigOpen] = useState(true);
    const [charts, setCharts] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const theme = useTheme();

    const firstCall = useCallback(() => {
        if (props.params.charts) {
            saveSettings(props.params.charts)
        } else {
            setConfigOpen(!configOpen)
        }
    },
        [props.params.charts]
    );

    useEffect(() => {
        firstCall()
    }, [])


    const saveSettings = (settings) => {
        let title_ = ''
        let charts_ = []
        let promises = settings.map(s => {
            setSubtitle(s.period)
            charts_.push({ name: s.name, type: s.type, pos: s.pos, color: s.color, period: s.period })
            title_ = title_ !== '' ? title_ + ' | ' + _.capitalize(s.name) : _.capitalize(s.name)
            switch (s.name) {
                case "price": {
                    return fetchPriceData(ticker, s.period, token)
                }
                case "dividend": {
                    return fetchDividendData(ticker, s.period, token)
                }
                case "financial": {
                    return fetchFinancialHistory(ticker, token)
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
                            case "financial": {
                                r.value.values.filter(el => el.period === "yearly")
                                    .forEach(p => {
                                        let date = new Date(p.dateEpoch)
                                        let data = chartsData_[date.getTime()] || { date: date }
                                        data.financial = p.value
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
                props.changeParams({
                    id: props.i,
                    content: { charts: charts_ }
                })
            }
            );

    }

    const dateFormatter = date => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    return (
        <Card openSettings={() => setConfigOpen(!configOpen)} {...props}>
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
        </Card>
    )
}





export default function MultichartsCard(props) {

    return ({
        type: 'multichart',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>
                <BarChart_ key={props.i} {...props} />
            </Paper>
        )
    })

}