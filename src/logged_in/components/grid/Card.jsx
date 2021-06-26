import { React, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton,} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(1),
    },

}));


export default function MainCard(props) {
    const classes = useStyles();
    const [menuActive, isMenuActive] = useState(false);
    const theme = useTheme();


    return (
        <div className={classes.root} onMouseEnter={() => isMenuActive(true)} onMouseLeave={() => isMenuActive(false)}>
            <span className="grid-menu">

                {props.openSettings &&
                    <Fade in={menuActive} timeout={600}>
                        <IconButton size="small" onClick={props.openSettings}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </Fade>

                }
                {props.onRemoveItem &&
                    <Fade in={menuActive} timeout={600}>
                        < IconButton size="small" onClick={() => props.onRemoveItem(props.i)}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Fade>
                }
            </span>
            {props.children}

        </div >

    )
}


