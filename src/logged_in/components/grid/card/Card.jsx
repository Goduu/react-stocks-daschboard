import { React, useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
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
    console.log("Propsorsp", props)
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [ticker, setTicker] = useState('AAPL')
    let ticker = props.identifier
    const [card, setCard] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [currency, setCurrency] = useState('')

    useEffect(() => {
        console.log('getQuoteData', ticker)
        getQuoteData(ticker)
            .then(res => {
                console.log('response fetch card', res)
                setName(res.name)
                setPrice(res.price)
                setCurrency(res.currency)
            })
    }, [ticker])

    // console.log("OUTLINE DEPOIS DISPATCH")
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
                    <span >
                        {/* <TableSettingMenus options={options} /> */}
                    </span>
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
