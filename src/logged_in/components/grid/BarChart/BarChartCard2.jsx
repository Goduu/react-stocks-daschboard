import { React, useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
// import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChartSettings from './ChartSettings'
import { fetchPriceData,fetchDividendData } from '../../../../shared/functions/requests'
import { format } from "date-fns";

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


function BarChart_(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const [configOpen, setConfigOpen] = useState(false);
    const [charts, setCharts] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [chartRefresh, setChartRefresh] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);


    useEffect(() => {
        // fetchEsgRisk(ticker, token)
        //     .then(res => {
        //         console.log("fetchEsgRisk", res)
        //         setEsgs(res)
        //     })
    }, [ticker, token])

    const changeState = (params) => {
        let data = chartsData;
        params.data.forEach(d => data.push({ date: d.date, [params.name]: d.value }))
        console.log("Changestate", chartsData, charts)
        
        setCharts(prevState => {
            prevState = prevState.filter(p => p.name !== params.name)
            return [
                ...prevState,
                { name: params.name, type: params.type, pos: params.pos }
            ]
        });
        setChartsData(data);
    }
   

    const saveSettings = (settings) => {
        setChartRefresh(true)
        console.log("settings", settings)
        let chartsData_ = []
        let charts_ = []
        settings.forEach(s => {
            switch (s.name) {
                case "price": {
                    fetchPriceData(ticker, 200, token)
                        .then(res => {
                            res = res.PriceHistory.map(p => {
                                return { value: p.close, date: new Date(p.date.year, p.date.month, p.date.dayOfMonth).getTime() }
                            })
                            // changeState({ ...s, data: res })
                            res.forEach(d => chartsData_.push({ date: d.date, [s.name]: d.value }))
                            charts_.push({ name: s.name, type: s.type, pos: s.pos })
                        })
                    break;
                }
                case "dividend": {
                    fetchDividendData(ticker, 200, token)
                        .then(res => {
                            console.log("DIVI", res)
                            res = res.PriceHistory.map(p => {
                                return { value: p.adjDividend, date: new Date(p.date.year, p.date.month, p.date.dayOfMonth).getTime() }
                            })
                            // changeState({ ...s, data: res })
                            res.forEach(d => chartsData_.push({ date: d.date, [s.name]: d.value }))
                            charts_.push({ name: s.name, type: s.type, pos: s.pos })
                        })
                    break;
                }
            }
        })
        setChartsData(chartsData_)
        setCharts(charts_)
        setChartRefresh(false)
        setTimeout(() => {
            forceUpdate()
          }, 1500);


    }

    const dateFormatter = date => {
        return format(new Date(date), "dd/MM/yyyy");
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
                            Title
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Subtitle
                        </Typography>

                    </Grid>
                    <Grid xs={3}>

                    </Grid>
                    <Grid xs={3}>
                        <IconButton
                            aria-label="More"
                            // aria-owns={isOpen ? "long-menu" : undefined}
                            aria-haspopup="true"
                        // onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
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
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" scale="time" tickFormatter={dateFormatter}/>
                            <YAxis 
                            domain={[0, 'dataMax+0.2*dataMax']}
                             yAxisId="right"
                             orientation="right"
                             />
                            <YAxis 
                            domain={[0, 'dataMax+0.2*dataMax']}
                             yAxisId="left"
                             orientation="left"
                             />
                            <Tooltip />
                            <Legend />
                            {charts.map(el => {
                                if (el.type === 'bar') {
                                    console.log("Bar", el)
                                    return <Bar key={el.name} dataKey={el.name} fill="#8884d8" yAxisId={el.pos} />
                                } else if (el.type === 'line') {
                                    console.log("Line", el)
                                    return <Line key={el.name} dataKey={el.name} stroke="#2774d7" strokeWidth={2} dot={false} yAxisId={el.pos} />
                                }
                            })}
                            {/* <Bar dataKey={'price'} fill="#8884d8" /> */}


                        </ComposedChart>
                    </ResponsiveContainer>
                }

                <buton onClick={forceUpdate}>asd</buton>
            </div>
        </div>
    )
}





export default function BarChartGrid(props) {

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