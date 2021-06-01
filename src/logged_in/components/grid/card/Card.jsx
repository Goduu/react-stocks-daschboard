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
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('')

    useEffect(() => {
        getQuoteData(ticker)
            .then(res => {
                setName(res.name)
                setPrice(res.price)
                setCurrency(res.currency)
            })
    }, [ticker])

    if (ticker) {
        return (
            <Card className={classes.root} variant="outlined">
                {/* card:{cards.name} */}
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {name ? name : <LinearProgress/>}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {ticker}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {currency} {price}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Technology
                        <br />
                        {'"Lorem ipslum here linder"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" >Learn More</Button>
                </CardActions>
            </Card>
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
                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-text-field">
                    <OutlinedCard {...props}/>
                </div>
            </div>)
    }
    );
}
