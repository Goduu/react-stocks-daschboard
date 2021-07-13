import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { findWatchlist } from '../../../shared/functions/requests.js';
import {  makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import WatchlistInterface from './WatchlistInterface'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            backgroundColor: '#202022',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-corner': {
            backgroundColor: '#202022',
        },
        '&::-webkit-scrollbar-thumb': {
            border: '3px solid #202022',
            minHeight: '24px',
            borderRadius: '8px',
            backgroundColor: '#585859'
        },


    },
    title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '96%',
        whiteSpace: 'nowrap'
    },
    mainCell: {
        borderLeftColor: theme.palette.action.disabled,
        borderLeftStyle: 'solid',
        borderLeftWidth: '15px',
        borderLeftHeight: '15px',
        padding: theme.spacing(1),
        maxWidth: '200px'
    },
    ticker: {
        paddingBottom: theme.spacing(1),
    },
    chart: {
        height: '70px',
        maxWidth: '300px'
    },

}));

const headCells = [
    { id: 'name', disablePadding: true, label: 'Ticker' },
    { id: 'chart', disablePadding: true, label: '' },
    { id: 'price', disablePadding: true, label: 'Price' },
    { id: 'volatility', disablePadding: true, label: 'Volatility' },
    { id: 'profit', disablePadding: true, label: 'Profit' },
    { id: 'dividend', disablePadding: true, label: 'Dividend' },
    { id: 'book', disablePadding: true, label: 'Book' },
];

function Watchlist(props) {
    const {
        selectWatchlist
    } = props;
    useEffect(selectWatchlist, [selectWatchlist]);
    const classes = useStyles();

    const { t } = useTranslation();
    const [tickers, setTickers] = useState(['IBM', 'WEGE3.SA', 'SU.PA', 'BMW.DE', 'FRT','VVAR3.SA', 'BBAS3.SA','ATVI','FB','OR.PA'])
    const [tickersData, setTickersData] = useState([])
    const statistics = ['eps', 'beta']
    const finance = ['profitMargins', 'earningsQuarterlyGrowth']
    const book = ['bookValuePerShare', 'priceBook']
    const dividend = ['lastDividendValue', 'lastDividendDate']
    const columns = [statistics, finance, dividend, book]
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.id)

    useEffect(() => {
        findWatchlist(userId, token)
        // fetchWatchlistData(tickers, token)
        //     .then(res => {
        //         setTickersData(res.map(el => {
        //             el.statistics = el.statistics.map(r => {
        //                 return { ...r, value: formatValueByType(r) }
        //             })
        //             el.priceChart.values = el.priceChart.values.map(r => {
        //                 return { value: r }
        //             })
        //             return el
        //         }
        //         ))
        //     })
    }, [])


    return (
        <WatchlistInterface
            classes={classes}
            headCells={headCells}
            tickersData={tickersData}
            columns={columns}
            t={t}
        />

    )

}

// Watchlist.propTypes = {

// };

export default Watchlist;