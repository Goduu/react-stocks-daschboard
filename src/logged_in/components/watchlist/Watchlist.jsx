import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import { useSelector } from 'react-redux';
import { fetchWatchlistData } from '../../../shared/functions/requests.js';
import { useSnackbar } from 'notistack';
import { TableHead, Paper, Typography, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getTickers, getTrendingTickers } from '../../../shared/functions/requests.js';
import { InDevelopment } from '../../../shared/components/InDevelopment';
import { useTranslation } from 'react-i18next';
import BuildIcon from '@material-ui/icons/Build';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
    XAxis
} from "recharts";
import { formatValueByType } from '../../../shared/functions/formatValueByType'

const ResponsiveReactGridLayout = WidthProvider(RGL);


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
        }

    },
    paper: {
        height: '75px',
        width: '200px',
        padding: theme.spacing(2),

    },
    stats: {
        height: '75px',
        width: 'auto',
        paddingTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '96%',
        whiteSpace: 'nowrap'
    },
    cell2: {
        margin: 0
    }

}));

const headCells = [
    { id: 'name',  disablePadding: true, label: 'Ticker' },
    { id: 'price',  disablePadding: true, label: 'Price' },
    { id: 'priceChart',  disablePadding: true, label: 'Price Chart' },
    { id: 'eps',  disablePadding: true, label: 'eps' },
    { id: 'pe',  disablePadding: true, label: 'pe' },
    { id: 'beta',  disablePadding: false, label: 'beta' },
    { id: 'marketCap',  disablePadding: false, label: 'marketCap' },
    { id: 'profitMargins',  disablePadding: false, label: 'profitMargins' },
    { id: 'earningsQuarterlyGrowth',  disablePadding: false, label: 'earningsQuarterlyGrowth' },
  ];
  
function Watchlist(props) {
    const {
        selectWatchlist
    } = props;
    useEffect(selectWatchlist, [selectWatchlist]);
    const classes = useStyles();

    const { t } = useTranslation();
    const [tickers, setTickers] = useState(['IBM', 'WEGE3.SA', 'SU.PA', 'BMW.DE'])
    const [tickersData, setTickersData] = useState([])
    const [statistics, setStatistics] = useState(['eps', 'pe', 'beta', 'marketCap', 'profitMargins', 'earningsQuarterlyGrowth'])
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        fetchWatchlistData(tickers, token)
            .then(res => {
                setTickersData(res.map(el => {
                    el.statistics = el.statistics.map(r => {
                        return { ...r, value: formatValueByType(r) }
                    })
                    el.priceChart.values = el.priceChart.values.map(r => {
                        return { value: r }
                    })
                    return el
                }
                ))
            })
    }, [])


    return (
        <div>

            <Typography variant="h5">
                Watchlist
                <InDevelopment />
            </Typography>
            <TableContainer className={classes.root}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    // padding={headCell.disablePadding ? 'none' : 'normal'}
                                    // sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        // active={orderBy === headCell.id}
                                        // direction={orderBy === headCell.id ? order : 'asc'}
                                        // onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {/* {orderBy === headCell.id ? ( */}
                                            {/* <span className={classes.visuallyHidden}> */}
                                                {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                                            {/* </span> */}
                                        {/* ) : null} */}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickersData.map(tick => {
                            return (
                                <TableRow key={tick.longName}>
                                    <TableCell padding='none'>
                                        <Paper className={classes.paper}>
                                            <Typography color="textSecondary" variant="h9" noWrap={true}>
                                                <div className={classes.title}>
                                                    {tick.data.longName}
                                                </div>
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {tick.data.ticker}
                                            </Typography>


                                        </Paper>
                                    </TableCell>
                                    <TableCell padding='default' >
                                        <Paper className={classes.stats}>
                                            <Typography
                                                variant="h5"
                                            >
                                                <b>  {tick.data.price}</b>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                {tick.data.currency}
                                            </Typography>
                                        </Paper>
                                    </TableCell>
                                    <TableCell padding='default'>
                                        <Paper className={classes.paper}>
                                            < ResponsiveContainer width="95%" height="95%">
                                                <LineChart data={tick.priceChart.values} type="number" >
                                                    <Line dataKey="value" type="monotone" stroke="#8884d8" strokeWidth={1} dot={false} />
                                                    <YAxis domain={['dataMin', 'dataMax']} hide />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Paper>
                                    </TableCell>
                                    {
                                        statistics.map(st => {
                                            return (
                                                <TableCell padding='default' key={st} >
                                                    <Paper className={classes.stats}>
                                                        <Typography
                                                            variant="h5"
                                                        >
                                                            <b> {tick.statistics.find(el => el.label === st).value}</b>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" noWrap>
                                                            {t('indicators.' + st)}
                                                        </Typography>
                                                    </Paper>
                                                </TableCell>
                                            )
                                        })
                                    }
                                    <br />
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    )

}

// Watchlist.propTypes = {

// };

export default Watchlist;