import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { findWatchlist, fetchWatchlistData, updateWatchlist, fetchTickersInfosByList } from '../../../shared/functions/requests.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { formatValueByType } from '../../../shared/functions/formatValueByType'
import { useSnackbar } from 'notistack';


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
    sort: {
        cursor: 'pointer'
    }

}));

const headCells = [
    { id: 'name', disablePadding: true, label: 'Ticker' },
    { id: 'chart', disablePadding: true, label: '' },
    { id: 'price', disablePadding: true, label: 'Price' },
    { id: 'volatility', disablePadding: true, label: 'Volatility' },
    { id: 'profit', disablePadding: true, label: 'Profit' },
    { id: 'dividend', disablePadding: true, label: 'Dividend' },
    { id: 'book', disablePadding: true, label: 'Book' },
    { id: 'actions', disablePadding: true, label: 'Actions' },
];

function Watchlist(props) {
    const {
        selectWatchlist
    } = props;
    useEffect(selectWatchlist, [selectWatchlist]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { t } = useTranslation();
    const [tickers, setTickers] = useState([])
    const [tickersData, setTickersData] = useState([])
    const [watchlistId, setWatchlistId] = useState(null)
    const [sortedBy, setSortedBy] = useState('ticker')
    const [page, setPage] = useState(0)
    const statistics = ['keyStatistics.trailingEps', 'keyStatistics.beta']
    const finance = ['financialData.profitMargins', 'keyStatistics.earningsQuarterlyGrowth']
    const book = ['keyStatistics.bookValue', 'keyStatistics.priceToBook']
    const dividend = ['keyStatistics.lastDividendValue', 'keyStatistics.lastDividendDate']
    const columns = [statistics, finance, dividend, book]
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.id)


    useEffect(() => {
        findWatchlist(userId, token).then(res => {
            if (res) {
                setTickers(res.list)
                setWatchlistId(res.id)
                fetchData(res.list, sortedBy, page)
            }
        })
    }, [])

    useEffect(() => {
        fetchData(tickers, sortedBy, page)
    }, [sortedBy])

    const fetchData = (tickers_, sortedBy_, page_) => {
        console.log("fetch")
        if (tickers_.length > 0) {
            fetchWatchlistData(tickers_, sortedBy_, page_, token)
                .then(res => {
                    console.log("Res data watch", res)
                    setTickersData(res.map(el => {
                        el.statistics = [
                            { label: 'keyStatistics.beta', value: el.ticker.keyStatistics.beta || '-' },
                            { label: 'keyStatistics.trailingEps', value: el.ticker.keyStatistics.trailingEps || '-' },
                            { label: 'financialData.profitMargins', value: el.ticker.financialData.profitMargins || '-' },
                            { label: 'keyStatistics.earningsQuarterlyGrowth', value: el.ticker.keyStatistics.earningsQuarterlyGrowth || '-' },
                            { label: 'keyStatistics.bookValue', value: el.ticker.keyStatistics.bookValue || '-' },
                            { label: 'keyStatistics.priceToBook', value: el.ticker.keyStatistics.priceToBook || '-' },
                            { label: 'keyStatistics.lastDividendValue', value: el.ticker.keyStatistics.lastDividendValue || '-' },
                            { label: 'keyStatistics.lastDividendDate', value: el.ticker.keyStatistics.lastDividendDate || '-' },
                        ]
                        el.priceChart.values = el.priceChart.values.map(r => {
                            return { value: r }
                        })
                        el.price = el.priceChart.values.slice(-1)[0].value
                        console.log("eaelalea", el)
                        return el
                    }
                    ))
                })
        }
    }

    // useEffect(() => {
    //     console.log("useeffect")
    //     fetchData()
    //  }, [tickers])

    const selectNewTicker = (ticker) => {
        console.log("Select", ticker, tickers)
        setTickers(prev => {
            if (!prev.includes(ticker)) {
                prev.push(ticker)
                fetchData(prev, page)
                updateWatchlist(watchlistId, tickers, userId, token)
                    .then(res => setWatchlistId(res))
            }
            else {
                enqueueSnackbar(ticker + " already in watchlist", { variant: 'info' });
            }
            return prev
        })
    }

    const removeTicker = (ticker) => {
        console.log("Select", ticker, tickers)
        setTickers(prev => {
            console.log("prev remove", prev, ticker)
            prev = prev.filter(t => t !== ticker)
            updateWatchlist(watchlistId, prev, userId, token)
                .then(res => {
                    setWatchlistId(res)
                    enqueueSnackbar(ticker + " removed", { variant: 'success' });
                })

            console.log("final remove", prev, ticker)
            return prev
        })
        setTickersData(prev => {
            return prev.filter(el => el.ticker.ticker !== ticker)
        })

    }
    const handleFetchTickersInfosByList = () => {
        fetchTickersInfosByList(tickers, token).then(r => console.log("res", r))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchData(tickers, newPage)
    };


    return (
        <WatchlistInterface
            classes={classes}
            headCells={headCells}
            tickersData={tickersData}
            tickers={tickers}
            columns={columns}
            page={page}
            sortedBy={sortedBy}
            selectNewTicker={selectNewTicker}
            handleFetchTickersInfosByList={handleFetchTickersInfosByList}
            handleChangePage={handleChangePage}
            removeTicker={removeTicker}
            setSortedBy={setSortedBy}
            t={t}
        />

    )

}

// Watchlist.propTypes = {

// };

export default Watchlist;