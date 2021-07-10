import React from "react";
import { TableHead, Typography, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell,Paper } from '@material-ui/core';
import { InDevelopment } from '../../../shared/components/InDevelopment';
import { Link } from 'react-router-dom';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import TickerSelector from './TickerSelector'

import {
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
} from "recharts";


function Watchlist(props) {
    let { classes, headCells, tickersData, columns } = props
    let { t } = props


    return (
        <div>

            <Typography variant="h5">
                Watchlist
                <InDevelopment />
            </Typography>
            <Tooltip title="Add Dashboard">
                {/* <IconButton >
                    <LibraryAddIcon />
                </IconButton > */}
                <TickerSelector/>
            </Tooltip>
            <TableContainer className={classes.root}>
                <Table className={classes.table} padding='normal'>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                >

                                    {headCell.label}

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickersData.map(tick => {
                            return (
                                <TableRow key={tick.longName}>
                                    <TableCell padding='none' className={classes.mainCell}>
                                        <Link to={`/c/grid/${tick.data.ticker}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography color="textSecondary" variant="subtitle1" noWrap={true}>
                                                <div className={classes.title}>
                                                    {tick.data.longName}
                                                </div>
                                            </Typography>
                                            <Typography variant="h5" component="h2" className={classes.ticker}>
                                                {tick.data.ticker}
                                            </Typography>
                                        </Link>

                                    </TableCell>
                                    <TableCell padding='default' >
                                        <Tooltip title={'7 Days'}>
                                            <div className={classes.chart}>
                                                < ResponsiveContainer width="95%" height="95%">
                                                    <LineChart data={tick.priceChart.values} type="number" >
                                                        <Line dataKey="value" type="monotone" stroke="#8884d8" strokeWidth={1} dot={false} />
                                                        <YAxis domain={['dataMin', 'dataMax']} hide />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell padding='default' >
                                        <Typography
                                            variant="h6"
                                        >
                                            <b>  {tick.data.price}</b>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" noWrap>
                                            {tick.data.currency}
                                        </Typography>
                                    </TableCell>

                                    {
                                        columns.map(col => {
                                            return <TableCell padding='default' key={col}>
                                                {col.map(c => {
                                                    return (
                                                        <TableRow key={c}>
                                                            <Typography
                                                                variant="h6"
                                                            >
                                                                <b> {tick.statistics.find(el => el.label === c) ?
                                                                    tick.statistics.find(el => el.label === c).value : '-'}</b>
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                                {t('indicators.' + c)}
                                                            </Typography>
                                                        </TableRow >
                                                    )
                                                })}
                                            </TableCell>
                                        })
                                    }

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