import { React, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Grid, Typography, Tooltip } from '@material-ui/core';
import { getGridsIdentifiers } from '../../../../shared/functions/requests.js';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// '-webkit-mask-image': 'linear-gradient(90deg, #000 96%, transparent)',
const menuWidth = 500
const useStyles = makeStyles((theme) => ({

    menuWrapper: {
        position: 'relative',
        paddingBottom: theme.spacing(1),
        display: 'flex',

    },
    menu: {
        width: menuWidth,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        paddingLeft: theme.spacing(1),
        scrollBehavior: 'smooth'


    },
    itens: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        transition: 'all 200ms',
        width: 'auto',
        zIndex: 4,
        "&:hover": {
            transform: 'scale(1.08)',
        },
        cursor: 'pointer'
    },
    arrowRight: {
        position: 'absolute',
        transition: 'all 200ms',
        marginLeft: -30,
        width: 'auto',
        zIndex: 5,
        "&:hover": {
            transition: 'all 200ms',
        },
        cursor: 'pointer'
    },
    arrowLeft: {
        position: 'absolute',
        marginLeft: menuWidth * 0.99,
        transition: 'all 200ms',
        width: 'auto',
        zIndex: 5,
        "&:hover": {
            // transform: 'scale(2)',
            transition: 'all 200ms',
            zIndex: 3
        },
        cursor: 'pointer'
    }

}));

/*
* Top menu of the grid with the tickers 
*  select a ticker to chose its dashboard
*/
export function SelectMenu(props) {
    const classes = useStyles();
    const [scrollArrow, setScrollArrow] = useState(true);
    const [identifiers, setIdentifiers] = useState([]);
    const [isMaxLeft, setIsMaxLeft] = useState(false);
    const [isMaxRight, setIsMaxRight] = useState(false);
    const myRef = useRef(null)
    const userId = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)

    const executeScroll = (e) => {
        // myRef.current.scrollLeft = myRef.current.scrollLeft + 5 * e.movementX//myRef.current.scrollLeft -e.offsetX + "px";
        console.log("scrollWidth", myRef.current.scrollWidth)
        console.log("clientWidth", myRef.current.clientWidth)
        console.log("scrollLeft", myRef.current.scrollLeft)
    }
    const scrollLeft = () => {
        let sleft = myRef.current.scrollLeft + 120
        console.log("sleft", sleft)
        myRef.current.scrollLeft = sleft
        setIsMaxRight((myRef.current.scrollWidth - sleft) <= myRef.current.clientWidth)
        setIsMaxLeft(sleft <= 0)

    }

    const scrollRight = () => {
        let sleft = myRef.current.scrollLeft - 120
        myRef.current.scrollLeft = sleft
        setIsMaxLeft(sleft <= 0)
        setIsMaxRight((myRef.current.scrollWidth - sleft) === myRef.current.clientWidth)

    }

    useEffect(() => {
        console.log("Usou o effeito", myRef.current.scrollWidth, myRef.current.clientWidth,
         myRef.current.scrollLeft,myRef.current.scrollWidth <= myRef.current.clientWidth,myRef.current.clientWidth >= myRef.current.scrollWidth)
        setScrollArrow(myRef.current.clientWidth >= myRef.current.scrollWidth)
        setIsMaxLeft(myRef.current.scrollLeft <= 0)
        setIsMaxRight(myRef.current.scrollWidth <= myRef.current.clientWidth)
    }, [])

    useEffect(() => {
        setScrollArrow(myRef.current.clientWidth >= myRef.current.scrollWidth)
        setIsMaxLeft(myRef.current.scrollLeft <= 0)
    })

    useEffect(() => {
        getGridsIdentifiers(userId, token)
            .then(res => {
                setIdentifiers(res)
            })
    }, [userId])

    useEffect(() => {
        console.log("Getid")
        getGridsIdentifiers(userId, token)
            .then(res => {
                setIdentifiers(res)
            })
    }, [props.identifier, userId])


    return (
        <div className={classes.menuWrapper}>
            {/* <button onClick={executeScroll}>exec</button> */}
            <div className={classes.menu}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap="nowrap">
                    <Grid item >
                        <Tooltip title="Delete Dashboard">
                            <Paper elevation={2} className={classes.itens} onClick={props.handleDeletDashboard}>
                                <DeleteIcon />
                            </Paper >
                        </Tooltip>
                    </Grid>
                    <Grid item >
                        <Tooltip title="Add Dashboard">
                            <Paper elevation={2} className={classes.itens} onClick={props.handleAddDashboard}>
                                <LibraryAddIcon />
                            </Paper >
                        </Tooltip>
                    </Grid>
                </Grid>

            </div>
            <div className={classes.menu} ref={myRef}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap="nowrap">
                    <Grid item key={'arrback'} className={classes.arrowRight} hidden={scrollArrow || isMaxLeft} onClick={scrollRight}>
                        <IconButton size="small" edge="start">
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Grid>

                    {identifiers.map(el => {
                        if (el !== props.identifier) {
                            return (
                                <Grid item key={el} xs>
                                    <Paper elevation={2} className={classes.itens} onClick={() => props.selectDashboard(el)}>
                                        <Typography
                                            variant="h6"
                                        >
                                            {el}
                                        </Typography>
                                    </Paper >
                                </Grid>
                            )
                        }
                    })}

                    <Grid item key={'arrfoward'} className={classes.arrowLeft} hidden={scrollArrow || isMaxRight} onClick={scrollLeft}>
                        <IconButton size="small" edge="start">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

