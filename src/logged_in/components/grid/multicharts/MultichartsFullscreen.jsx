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

function MultichartsFullscreen(props) {
    const classes = useStyles();
    // const { t } = useTranslation();
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const [configOpen, setConfigOpen] = useState(true);
    const [charts, setCharts] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [timestamp, setTimestamp] = useState(props.tickerData ? props.tickerData.chart.timestamp : [])
    const [chartQuotes] = useState(props.tickerData ? props.tickerData.chart.indicators.quote[0] : [])
    const [dividends] = useState(props.tickerData ? props.tickerData.dividend.dividends : [])
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const theme = useTheme();

    const firstCall = useCallback(() => {
        let charts_ =[]
        let title_
        props.params.charts.forEach(s => {
            charts_.push({ name: s.name, type: s.type, pos: s.pos, color: s.color })
            title_ = title_ !== '' ? title_ + ' | ' + _.capitalize(s.name) : _.capitalize(s.name)
        })
        setTitle(title_)
        setCharts(charts_)

    },
        [props.params.charts]
    );

    useEffect(() => {
        firstCall()
    }, [])



    const dateFormatter = date => {
        // return format(new Date(date), "yyyy-MM-dd");
        return '10/12/2121'
    };

    return (
        <div>
            adsad
        </div>
        // <MultichartInterface
        //     classes={classes}
        //     charts={charts}
        //     chartsData={chartsData}
        //     title={title}
        //     subtitle={subtitle}
        //     timestamp={timestamp}
        //     chartQuotes={chartQuotes}
        //     dateFormatter={dateFormatter}
        //     {...props}
        // />
    )
}





export { MultichartsFullscreen }