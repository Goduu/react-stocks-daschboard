import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'block',
        marginLeft: '40%',
        position: 'relative',
        
    },
    iconDoc:{
        position: 'absolute',
        fontSize: '3em',
        marginLeft: '1.4vw',
        marginTop: '-2vh',
    },
    boxIcon:{
        position: 'absolute',
        fontSize: '4em',
        marginLeft: '1vw',
        marginTop: '-1vh',
    },
    text: {
        fontSize: '1.5em',
        position: 'absolute',
        marginLeft: '0.5vw',
        marginTop: '4.2vh',
    }
});

const NoData = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DescriptionIcon className={classes.iconDoc} />
            <InboxOutlinedIcon className={classes.boxIcon} />
            <span className={classes.text}>
                No Data
            </span>
        </div>
    )
}

export default NoData