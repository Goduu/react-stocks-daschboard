import { React, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fetchStatistics } from '../../../../shared/functions/requests.js';
import { Paper, Grid, Typography, Radio, Tooltip, Link, Popover, ClickAwayListener } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CardWrapper from '../Card'
import { format } from "date-fns";
import StatisticsSettings from './StatisticsSettings'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import { lime, teal, orange } from '@material-ui/core/colors';

function Content(props) {
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

    const firstCall = useCallback(() => {
        if (props.params.statisticSelected) {
            setStatisticSelected(props.params.statisticSelected)
            setColor(selectColor(props.params.feedback))
            setFeedback(props.params.feedback)
        } else {
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
        }
    }));
    const classes = useStyles();
    const ticker = props.identifier

    const formatType = (obj) => {
        const type = obj.dataType
        let v = obj.value
        if (v) {
            if (type === 'date') {

                return format(new Date(v.year, v.month, v.dayOfMonth), "yyyy-MM-dd");

            } else if (type === 'number') {
                if (v > 1000000000) {
                    return (v / 1000000000).toFixed(2) + 'B'
                } else if (v > 1000000) {
                    return (v / 1000000).toFixed(2) + 'M'
                }
                return v.toFixed(2)

            }
        }
        return null
    }
    useEffect(() => {
        fetchStatistics(ticker, token)
            .then(res => {
                let formated = res.map(r => {
                    return { ...r, value: formatType(r) }
                })
                setStatistics(formated)
                firstCall()

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
    const handleMouseOutFeedback = () => {
        setFeedbackOpen(false)
        setAnchorFeedback(null)
    }

    return (
        <CardWrapper {...props} openSettings={handleClickListItem}>
            <StatisticsSettings anchorEl={[anchorSettings, setAnchorSettings]} open={settingsOpen} saveSettings={saveSettings} statistics={statistics}></StatisticsSettings>
            <div className={classes.root}>
                <Grid container spacing={0} >
                    {statisticSelected &&
                        <Grid item xs key={statisticSelected.label}>
                            <Typography
                                variant="h5"
                                style={{ color: color }}

                            // onMouseOut={handleMouseOutFeedback}
                            >
                                <b onMouseOver={handleMouseOverFeedback}

                                    style={{ cursor: feedback && 'pointer' }}
                                    onClick={feedback && (() => handleFeedback(undefined))}>
                                    {statistics.find(s => s.label === statisticSelected)
                                        && statistics.find(s => s.label === statisticSelected).value}
                                </b>
                                <ClickAwayListener onClickAway={handleMouseOutFeedback}>
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
                                </ClickAwayListener>
                            </Typography>
                            <Link href={t('indicators.ref.' + statisticSelected)} target="_blank" color="inherit" >
                                <Tooltip title={t('indicators.info.' + statisticSelected)}>
                                    <Typography variant="body2" color="textSecondary" noWrap className={classes.link}>
                                        {t('indicators.' + statisticSelected)}
                                    </Typography>
                                </Tooltip>
                            </Link>
                        </Grid>
                    }
                </Grid>
            </div>
        </CardWrapper>
    );
}


export function Statistics(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props} style={{ overflow: 'hidden' }}>
                <Content key={props.i} {...props} />
            </Paper>
        )
    })

}