import { React, useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { fetchPriceData, fetchDividendData, fetchFinancialHistory } from '../../../../shared/functions/requests'
import { format, compareAsc } from "date-fns";
import _ from 'lodash'
import { MultichartInterface } from './MultichartsInterface'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(1),
    },
    header: {
        height: '30%',
        padding: theme.spacing(3),
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

function Multichart(props) {
    console.log("props",props)
    const classes = useStyles();
    // const { t } = useTranslation();
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const [configOpen, setConfigOpen] = useState(true);
    const [charts, setCharts] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [timestamp, setTimestamp] = useState(props.tickerData ? props.tickerData.chart.timestamp : [])
    const [chartQuotes, setChartQuotes] = useState(props.tickerData ? props.tickerData.chart.indicators.quote[0] : [])
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [fullScreen, setFullScreen] = useState(false);
    const theme = useTheme();

    const firstCall = useCallback(() => {
        // setTimestamp(props.tickerData.chart.timestamp)
        // setChartQuotes(props.tickerData.chart.indicators.quote[0])
        console.log("firstCall---", props.params.charts)
        if (props.params.charts) {
            saveSettings({ period: props.params.period, charts: props.params.charts })
        } else {
            setConfigOpen(!configOpen)
        }
    },
        [props.params.charts]
    );

    useEffect(() => {
        console.log("fisrt call")
        firstCall()
    }, [])


    const saveSettings = (settings) => {
        let title_ = ''
        let charts_ = []
        let period = settings.period
        settings.charts.forEach(s => {
            charts_.push({ name: s.name, type: s.type, pos: s.pos, color: s.color })
            title_ = title_ !== '' ? title_ + ' | ' + _.capitalize(s.name) : _.capitalize(s.name)
        })
        setCharts([...charts_])
        setTitle(title_)
        let now = new Date().getTime() / 1000
        let oneDay = 86400
        let chartData_ = Object.entries(timestamp).map(([key, value]) => {
            if (chartQuotes.close[key]) {
                return {
                    timestamp: value,
                    close: chartQuotes.close[key],
                    volume: chartQuotes.volume[key],
                }
            }
        })
        console.log("chartdata", chartData_, oneDay * settings.period)
        chartData_ = chartData_.filter(el => el && el.timestamp >= (now - (oneDay * period)))
        console.log("chartdata", chartData_)
        setChartsData(chartData_)
        setSubtitle(period)

        props.changeParams({
            id: props.i,
            content: { charts: charts_, period: period }
        })


    }

    const handleFullScreen = () => {
        console.log("full")
        setFullScreen(true)
    }

    const dateFormatter = date => {
        console.log("-------------", date)
        // return format(new Date(date), "yyyy-MM-dd");
        return '10/12/2121'
    };

    return (
        <MultichartInterface
            classes={classes}
            configOpen={configOpen}
            charts={charts}
            chartsData={chartsData}
            title={title}
            subtitle={subtitle}
            timestamp={timestamp}
            chartQuotes={chartQuotes}
            fullScreen={fullScreen}
            saveSettings={saveSettings}
            dateFormatter={dateFormatter}
            setConfigOpen={setConfigOpen}
            handleFullScreen={handleFullScreen}
            {...props}
        />
    )
}





export { Multichart }