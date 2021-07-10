import { React, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fetchStatistics } from '../../../../shared/functions/requests.js';
import { Paper, Grid, Typography, Radio, Tooltip, Link, Popover, ClickAwayListener } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardWrapper from '../Card'
import StatisticsSettings from './StatisticsSettings'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import Skeleton from '@material-ui/lab/Skeleton';
import {formatValueByType} from '../../../../shared/functions/formatValueByType'

function Statistics(props) {
    const { t } = useTranslation();
    const [statistics, setStatistics] = useState([])
    const [statisticSelected, setStatisticSelected] = useState()
    const token = useSelector(state => state.auth.token)
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState();
    const [color, setColor] = useState();
    const theme = useTheme();
    const [anchorSettings, setAnchorSettings] = useState(null);
    const [anchorFeedback, setAnchorFeedback] = useState(null);


    const selectColor = (val) => {
        switch (val) {
            case 'dislike': {
                return theme.palette.triad.red
            }
            case 'like': {
                return theme.palette.triad.green
            }
            case 'star': {
                return theme.palette.triad.yellow
            }
            default: {
                return theme.palette.text.primary
            }
        }
    }

    const firstCall = useCallback((stats) => {
        if (props.params.statisticSelected) {
            setStatisticSelected(props.params.statisticSelected)
            setColor(selectColor(props.params.feedback))
            setFeedback(props.params.feedback)
        } else {
            console.log("----,stats", stats)
            setStatisticSelected(stats[0].label)
            setSettingsOpen(!settingsOpen)
        }
    },
        [props.params, selectColor, settingsOpen, setColor]
    );

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            margin: theme.spacing(1),
            marginTop: theme.spacing(2) + 5,
        },
        paper: {
            margin: 0.8,
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            height: 98
        },
        checkbox: {
            align: 'right'
        },
        link: {
            marginTop: '3px',
            overflow: 'visible'
        },
    }));
    const classes = useStyles();
    const ticker = props.identifier

    
    useEffect(() => {
        fetchStatistics(ticker, token)
            .then(res => {
                let formated = res.map(r => {
                    return { ...r, value: formatValueByType(r) }
                })
                setStatistics(formated)
                firstCall(formated)

            })
    }, [ticker, token])

    const saveSettings = (value) => {
        setStatisticSelected(value)
        setFeedback(undefined)
        props.changeParams({
            id: props.i,
            content: { statisticSelected: value, feedback: undefined }
        })

    }


    const handleFeedback = (val) => {
        let newFeedback
        if (feedback === val) {
            setColor(undefined)
            newFeedback = undefined
        } else {
            let color = selectColor(val)
            setColor(color)
            newFeedback = val
        }
        setFeedback(newFeedback)

        props.changeParams({
            id: props.i,
            content: { statisticSelected: statisticSelected, feedback: newFeedback }
        })
        setFeedbackOpen(false)

    }

    const handleClickListItem = (event) => {
        setAnchorSettings(event.currentTarget);
    };
    const handleMouseOverFeedback = (event) => {
        if (feedback == undefined) {
            setFeedbackOpen(true)
            setAnchorFeedback(event.currentTarget)
        }

    }
    const handleMouseOutFeedback = (event) => {
        console.log("leave")
        // if(event.currentTarget != anchorFeedback){
        //     setFeedbackOpen(false)
        //     setAnchorFeedback(null)
        // }
    }

    return (
        <CardWrapper {...props} openSettings={handleClickListItem} >
            <StatisticsSettings anchorEl={[anchorSettings, setAnchorSettings]} open={settingsOpen} saveSettings={saveSettings} statistics={statistics}></StatisticsSettings>
            <div className={classes.root} >
                <Grid container spacing={0} >
                    {statisticSelected ?
                        <Grid item xs key={statisticSelected.label} >
                            <Typography
                                variant="h5"
                                style={{ color: color }}

                            >
                                <b
                                    style={{ cursor: 'pointer' }}
                                    onClick={feedback ? (() => handleFeedback(undefined)) : handleMouseOverFeedback}>
                                    {statistics.find(s => s.label === statisticSelected)
                                        && statistics.find(s => s.label === statisticSelected).value}
                                </b>
                                <Popover
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    anchorEl={anchorFeedback}
                                    open={feedbackOpen}
                                >
                                    <Paper elevation={0} className={classes.feedback}>

                                        <Radio className={classes.checkbox} value='star'
                                            style={{ color: feedback === 'star' ? color : theme.palette.text.hint }}
                                            checked={feedback === 'star'} onClick={(e) => handleFeedback(e.target.value)}
                                            size="small" icon={<GradeOutlinedIcon size="small" />}
                                            checkedIcon={<GradeIcon size="small" />} name="checkedH" />

                                        <Radio className={classes.checkbox} value='like'
                                            style={{ color: feedback === 'like' ? color : theme.palette.text.hint }}
                                            checked={feedback === 'like'} onClick={(e) => handleFeedback(e.target.value)}
                                            size="small" icon={<ThumbUpOutlinedIcon size="small" />}
                                            checkedIcon={<ThumbUpIcon size="small" />} name="checkedH" />

                                        <Radio className={classes.checkbox} value='dislike'
                                            style={{ color: feedback === 'dislike' ? color : theme.palette.text.hint }}
                                            checked={feedback === 'dislike'} onClick={(e) => handleFeedback(e.target.value)}
                                            size="small" icon={<ThumbDownOutlinedIcon size="small" />}
                                            checkedIcon={<ThumbDownIcon size="small" />} name="checkedH" />

                                    </Paper>

                                </Popover>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" noWrap className={classes.link}>
                                <Tooltip title={t('indicators.info.' + statisticSelected)}>
                                    <Link href={t('indicators.ref.' + statisticSelected)} target="_blank" color="inherit" >
                                        {t('indicators.' + statisticSelected)}
                                    </Link>
                                </Tooltip>
                            </Typography>
                        </Grid>
                        :
                        <>
                            <Skeleton animation="wave" height={50} width="50%" style={{ marginBottom: 3 }} />
                        </>
                    }
                </Grid>
            </div>
        </CardWrapper>
    );
}


export {Statistics}