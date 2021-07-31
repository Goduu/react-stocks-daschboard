import { React, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, isWidthDown, } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
          },
    },

}));


export default function MainCard(props) {
    const classes = useStyles();
    const [menuActive, isMenuActive] = useState(false);
    const theme = useTheme();
    const { extraMenu, openSettings, onRemoveItem, i } = props

    return (
        <div className={classes.root} onMouseEnter={() => isMenuActive(true)} onMouseLeave={() => isMenuActive(false)}>
            <span className="grid-menu">
                {extraMenu &&
                    <Fade in={menuActive || isWidthDown('xs', props.width)} timeout={600}>
                        <IconButton size="small" onClick={extraMenu.action}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                            <extraMenu.icon fontSize="small" />
                        </IconButton>
                    </Fade>
                }
                {openSettings &&
                    <Fade in={menuActive || isWidthDown('xs', props.width)} timeout={600}>
                        <IconButton size="small" onClick={openSettings}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </Fade>

                }
                {onRemoveItem &&
                    <Fade in={menuActive || isWidthDown('sm', props.width)} timeout={600}>
                        < IconButton size="small" onClick={() => onRemoveItem(i)}
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


