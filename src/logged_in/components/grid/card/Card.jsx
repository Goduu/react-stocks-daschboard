import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';

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
    // const [ticker, setTicker] = useState('AAPL')
    let ticker = useSelector(state => state.grid.currentTicker)
    let card = useSelector(state => state.grid.grids[ticker].card)
    let name = useSelector(state => state.grid.grids[ticker].card.name)
    let price = useSelector(state => state.grid.grids[ticker].card.price)
    let currency = useSelector(state => state.grid.grids[ticker].card.currency)
    
    // console.log("OUTLINE DEPOIS DISPATCH")
    if(card){
        return (
            <Card className={classes.root} variant="outlined">
                {/* card:{cards.name} */}
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {name}a 
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {ticker} b
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {currency} {price} c
                    </Typography>
                    <Typography variant="body2" component="p">
                        Technology
                        <br />
                        {'"a benevolent smile"'}
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
