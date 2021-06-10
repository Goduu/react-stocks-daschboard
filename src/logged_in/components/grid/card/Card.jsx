import { React, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { getQuoteData } from '../../../../shared/functions/requests.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import Stockinfos from './StockInfos';

const useStyles = makeStyles({
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
    pos: {
    },
});



function OutlinedCard(props) {
    const classes = useStyles();
    let ticker = props.identifier
    const [data, setData] = useState(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        getQuoteData(ticker)
            .then(res => {
                console.log("Alcapaha data", res)
                setData(res)
            })
    }, [ticker])

    if (data) {
        return (
            <>
            {dialogOpen && 
            <Stockinfos onClose={() => setDialogOpen(false)} data={data}/> }
            <Card className={classes.root} variant="outlined">
                {/* card:{cards.name} */}
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.longName ? data.longName : <LinearProgress/>}
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
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setDialogOpen(true)}>Learn More</Button>
                </CardActions>
            </Card>
            </>
        );
    } else {
        return null
    }

}

export function CardGrid(props) {


    return ({
        type: 'note',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props} className="MuiPaper-elevation1">
                <span className="grid-menu">
                </span>
                <div className="grid-text-field">
                    <OutlinedCard {...props}/>
                </div>
            </div>)
    }
    );
}
