import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListSubheader,
    makeStyles,
    Menu, MenuItem
} from '@mui/material/';
import { useEffect } from 'react';
import _ from 'lodash'
import { useTranslation } from 'react-i18next';

export default function StatisticsSettings(props) {
    const { saveSettings, statistics, setStatisticGroup, statisticGroup, handleClose, setOpen, open } = props;
    // const [open, setOpen] = useState(props.open);
    const { t } = useTranslation();


    const statisticsKeys = ['keyStatistics', 'summaryDetail', 'financialData']

    // useEffect(() => {
    //     setStatistics(props.statistics)
    // }, [props.statistics])

    const handleSave = (value) => {
        saveSettings(value);
        setOpen(false);
        // setSelectedValue(value);
    };

    const useStyles = makeStyles((theme) => ({
        list: {
            maxHeight: '400px',
            overflow: 'scroll',
            overflowX: 'hidden',
            width: '100%'
        },
        dialog: {
            overflowX: 'hidden',
            width: '100%'

        }

    }));
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} onClose={handleClose} fullWidth open={open}>
            <DialogTitle >Select your Statistic</DialogTitle>

            <DialogContent>
                <Grid container spacing={1} direction="row" justifyContent="center">
                    <Grid container item xs={6} >
                        <List>
                            <ListSubheader >
                                Groups
                            </ListSubheader>
                            {statisticsKeys && statisticsKeys.map((key) => {
                                return (
                                    <ListItem button
                                        key={key}
                                        value={key}
                                        onClick={() => setStatisticGroup(key)}
                                    >
                                        {key}
                                    </ListItem >
                                );
                            }
                            )}
                        </List>
                    </Grid>
                    <Grid container item xs={6} >
                        <div className={classes.list}>
                            <List component="div">
                                <ListSubheader >
                                    Statistics
                                </ListSubheader>
                                {statistics && statistics[statisticGroup] && Object.keys(statistics[statisticGroup]).map((key) => {
                                    return (
                                        <ListItem button
                                            key={statisticGroup + key}
                                            value={key}
                                            onClick={() => handleSave(key)}
                                        >
                                            {t(statisticGroup + '.' + key + '.label')}


                                        </ListItem >
                                    );
                                }
                                )}
                            </List>
                        </div>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>

    );
}

