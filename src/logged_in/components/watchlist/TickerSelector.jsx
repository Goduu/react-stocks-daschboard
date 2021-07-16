/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { TextField, Typography, List, ListItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTickersBySearch } from '../../../shared/functions/requests.js';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(3)
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    list: {
        position: "absolute",
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        backgroundColor: theme.palette.background.paper,
        zIndex: 2,
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.7
        }
    }
}));


export default function TickerSelector(props) {
    const classes = useStyles();
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.id)
    const [tickers, setTickers] = useState([])
    const [listOpen, setListOpen] = useState(false)
    let requestId = 0 // grant that the last call is set to tickers
    const { selectNewTicker } = props

    const filterResults = (e) => {
        let search = e.target.value === '' ? '-all-' : e.target.value
        fetchTickersBySearch(search, token, requestId)
            .then(r => {
                if (r.requestId === requestId - 1 && r.data.length > 0) {
                    setTickers(r.data)
                }
            })
        requestId += 1

    }
    const handleListItemClick = (item) => {
        console.log("selectNewTicker", item)
        selectNewTicker(item)
        handleClose()
    }
    const handleClose = () => {
        setListOpen(false)
    }
    const handleOpen = () => {
        setListOpen(true)
    }

    return (
        <div className={classes.wrapper}>
            <TextField
                label="Add a ticker"
                variant="outlined"
                onChange={filterResults}
                onClick={handleOpen}
                onBlur={() => setTimeout(() => {
                    handleClose()
                }, 200)}
            />
            <List component="nav" className={classes.list} hidden={!listOpen}>
                {tickers.map(t => {
                    return (
                        <ListItem
                            onClick={() => { console.log("Alcapaha"); handleListItemClick(t.ticker) }}
                            key={t.ticker}
                            className={classes.listItem}
                        >
                            <Typography variant="overline" style={{ fontSize: 10, marginRight: 5 }} display="block" gutterBottom>
                                {t.ticker}
                            </Typography>
                            <Typography variant="caption" style={{ fontSize: 12 }} display="block" gutterBottom>
                                {t.description}
                            </Typography>
                        </ListItem>
                    )
                })}
            </List>

        </div>

    );
}

