import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography, LinearProgress } from '@material-ui/core';
import { getQuoteData } from '../../../../shared/functions/requests.js';
import Stockinfos from './StockInfos';
import { useSelector } from 'react-redux';
import Card from '../Card'
import Skeleton from '@material-ui/lab/Skeleton';

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



function MainCard(props) {
    const classes = useStyles();
    let ticker = props.identifier
    const [data, setData] = useState(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        setLoading(true)
        getQuoteData(ticker, token)
            .then(res => {
                setData(res)
                setLoading(false)
            })
    }, [ticker])


    return (
        <Card {...props} close={true} >
            {dialogOpen &&
                <Stockinfos onClose={() => setDialogOpen(false)} data={data} />}
            <div className={classes.content}>
                {(loading || typeof data == 'undefined') ?
                    (<>
                        <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 3 }} />
                        <Skeleton animation="wave" height={40} width="45%" style={{ marginBottom: 3 }} />
                        <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 3 }} />
                        <Skeleton animation="wave" height={15} width="30%" />
                        <Skeleton width="45%" height={70} />

                    </>)
                    :
                    (<>
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
                    </>)
                }

            </div>
        </Card>
    );


}

export {MainCard}
