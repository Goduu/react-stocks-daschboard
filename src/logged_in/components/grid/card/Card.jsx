import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addCard, fetchCardInfo } from '../../../../shared/redux/actions/card.action'

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



function OutlinedCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ticker, setTicker] = useState('AAPL')
    let cards = useSelector(state => state.card.cards)

    // console.log("OUTLINE DEPOIS DISPATCH")
    if (!cards[ticker]) {
        return (
            <Card className={classes.root} variant="outlined">
                {ticker}
                <CardContent>
                <TextField id="outlined-basic" label="Chose Your Stock"
                    value={ticker}
                    variant="outlined"
                    onChange={(e) => setTicker(e.target.value)} />
                    <CardActions>
                        <Button size="small" onClick={() => dispatch(fetchCardInfo('AAPL'))}>Start</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className={classes.root} variant="outlined">
                {/* card:{cards.name} */}
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {cards[ticker].name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {ticker}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {cards[ticker].currency} {cards[ticker].price}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Technology
                    <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => dispatch(fetchCardInfo('AAPL'))}>Learn More</Button>
                </CardActions>
            </Card>
        );
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
                    <span onClick={props.onRemoveItem}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-text-field">
                    <OutlinedCard />
                </div>
            </div>)
    }
    );
}
