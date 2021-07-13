import { React } from 'react';
import { IconButton, Paper, Grid, Typography, Tooltip } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


/*
* Top menu of the grid with the tickers 
*  select a ticker to chose its dashboard
*/
export function SelectMenuInterface(props) {

    const { classes, isMaxLeft, isMaxRight, scrollRight, scrollLeft, identifiers, myRef } = props

    return (
        <div className={classes.menuWrapper} >
            {/* <button onClick={executeScroll}>exec</button> */}
            <div className={classes.menu} hidden={props.hidden}>
                <Grid
                    container
                    spacing={3}
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
            <div className={classes.menu} ref={myRef} hidden={props.hidden}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap="nowrap">
                    <Grid item key={'arrback'} className={classes.arrowRight} hidden={isMaxLeft} onClick={scrollLeft}>
                        <IconButton size="small" edge="start">
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Grid>

                    {identifiers.map(el => {
                        if (el !== props.identifier) {
                            return (
                                <Grid item key={el} >
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

                    <Grid item key={'arrfoward'} className={classes.arrowLeft} hidden={isMaxRight} onClick={scrollRight}>
                        <IconButton size="small" edge="start">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

