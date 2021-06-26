import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, CardContent, CardActions, Typography, LinearProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getQuoteData } from '../../../../shared/functions/requests.js';
import Stockinfos from './StockInfos';
import { useSelector } from 'react-redux';
import Card from '../Card'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '210px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    content: {
        margin: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),

    }
}));



function OutlinedCard(props) {
    const classes = useStyles();
    let ticker = props.identifier
    const [data, setData] = useState(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        getQuoteData(ticker, token)
            .then(res => {
                setData(res)
            })
    }, [ticker])

    if (data) {
        return (
            <Card {...props} close={false}>
                {dialogOpen &&
                    <Stockinfos onClose={() => setDialogOpen(false)} data={data} />}
                
                    <div className={classes.content}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {data.longName ? data.longName : <LinearProgress />}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {ticker}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {data.currency} {data.price}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {data.sector}
                        </Typography>

                        <div className={classes.button}>
                            <Button size="small" onClick={() => setDialogOpen(true)}>Learn More</Button>
                        </div>

                    </div>
                </Card>
        );
    } else {
        return null
    }

}

export function MainCardGrid(props) {


    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>
                <OutlinedCard {...props} />
            </Paper>)
    }
    );
}
