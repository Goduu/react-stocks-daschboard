import { React, useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { fetchPriceData, fetchDividendData, fetchFinancialHistory } from '../../../../shared/functions/requests'
import { format, compareAsc } from "date-fns";
import _ from 'lodash'
import {MultichartInterface} from './MultichartsInterface'


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

function Multichart(props) {
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
                    content: { charts: charts_  }
                })
            }
            );

    }

    const dateFormatter = date => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    return (
        <MultichartInterface
            classes={classes}
            configOpen={configOpen}
            charts={charts}
            chartsData={chartsData}
            title={title}
            subtitle={subtitle}
            saveSettings={saveSettings}
            dateFormatter={dateFormatter}
            setConfigOpen={setConfigOpen}
            {...props}
        />
    )
}





export { Multichart }