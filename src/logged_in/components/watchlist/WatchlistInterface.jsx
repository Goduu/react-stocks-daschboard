import React from "react";
import { TableHead, Typography, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell, Button,TableFooter, TablePagination } from '@material-ui/core';
import { InDevelopment } from '../../../shared/components/InDevelopment';
import { Link } from 'react-router-dom';
import TickerSelector from './TickerSelector'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import {
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
} from "recharts";


function Watchlist(props) {
    let { classes, headCells,tickers, tickersData, columns,page } = props
    let { t, selectNewTicker, handleFetchTickersInfosByList,handleChangePage, removeTicker } = props


    return (
        <div>

            <Typography variant="h5">
                Watchlist
                <InDevelopment />
            </Typography>

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
                                <TableRow key={tick.ticker.ticker}>
                                    <TableCell padding='none' className={classes.mainCell}>
                                        <Link to={`/c/grid/${tick.ticker.ticker}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography color="textSecondary" variant="subtitle1" noWrap={true}>
                                                <div className={classes.title}>
                                                    {tick.ticker.description}
                                                </div>
                                            </Typography>
                                            <Typography variant="h5" component="h2" className={classes.ticker}>
                                                {tick.ticker.ticker}
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
                                            <b>  {tick.price}</b>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" noWrap>
                                            {tick.ticker.currency}
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
                                                                {t(c)}
                                                            </Typography>
                                                        </TableRow >
                                                    )
                                                })}
                                            </TableCell>
                                        })
                                    }
                                    <TableCell padding='default'>
                                        <IconButton onClick={() => removeTicker(tick.ticker.ticker)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={tickers.length}
                                rowsPerPage={10}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Tooltip title="Add Dashboard">
                {/* <IconButton >
                    <LibraryAddIcon />
                </IconButton > */}
                <TickerSelector selectNewTicker={selectNewTicker} />
            </Tooltip>
            <Button onClick={handleFetchTickersInfosByList}>
                fetchTickersInfosByList
            </Button>
        </div>

    )

}

// Watchlist.propTypes = {

// };

export default Watchlist;