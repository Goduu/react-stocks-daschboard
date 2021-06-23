import { React } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import {
    IconButton,
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(1),
    }

}));


export default function MainCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className="grid-menu">
                {props.openSettings &&
                    <IconButton size="small" onClick={props.openSettings} >
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                }
                {props.onRemoveItem &&
                    < IconButton size="small" onClick={() => props.onRemoveItem(props.i)}>
                <CloseIcon fontSize="small" />
                </IconButton>
                }
            </span>
            { props.children }

        </div >

    )
}


