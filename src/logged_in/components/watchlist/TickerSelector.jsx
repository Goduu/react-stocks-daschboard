/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { TextField, Typography, List, ListItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchTickersBySearch } from '../../../shared/functions/requests.js';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
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
        '&:hover':{
            opacity: 0.7
        }
    }
}));


export default function CountrySelect() {
    const classes = useStyles();
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.id)
    const [tickers, setTickers] = useState(countries)

    const filterResults = (e) => {
        fetchTickersBySearch(e.target.value, token)
            .then(r => {
                setTickers(r)
                console.log("tickers", r)
            })
    }
    const handleListItemClick = (item) => {

    }

    return (
        <>
            <TextField
                label="Choose a country"
                variant="outlined"
                onChange={filterResults}
            />
            <List component="nav" className={classes.list}>
                {tickers.map(t => {
                    return (
                        <ListItem
                            onClick={(event) => handleListItemClick(event)}
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

        </>

    );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
    { ticker: 'AD', description: 'Andorra' },
    { ticker: 'AE', description: 'United Arab Emirates' },
    { ticker: 'AF', description: 'Afghanistan' },

];
