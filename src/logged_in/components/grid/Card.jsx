import { React, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { makeStyles, useTheme } from '@mui/styles';
import { Fade } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

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
                    <Fade in={menuActive} timeout={600}>
                        <IconButton size="small" onClick={extraMenu.action}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                            <extraMenu.icon fontSize="small" />
                        </IconButton>
                    </Fade>
                }
                {openSettings &&
                    <Fade in={menuActive} timeout={600}>
                        <IconButton size="small" onClick={openSettings}
                            style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </Fade>

                }
                {onRemoveItem &&
                    <Fade in={menuActive} timeout={600}>
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


