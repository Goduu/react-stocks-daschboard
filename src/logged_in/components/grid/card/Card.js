import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Apple Inc.
                </Typography>
                <Typography variant="h5" component="h2">
                    NASDAQ: APPL
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    USD 127.31
                </Typography>
                <Typography variant="body2" component="p">
                    Technology
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
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
