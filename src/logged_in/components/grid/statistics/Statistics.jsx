import { React, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fetchStatistics } from '../../../../shared/functions/requests.js';
import { Paper, Grid, Typography, Radio, Box } from '@material-ui/core';
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

function Content(props) {
    const { t } = useTranslation();
    const [statistics, setStatistics] = useState([])
    const [statisticSelected, setStatisticSelected] = useState()
    const token = useSelector(state => state.auth.token)
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [feedback, setFeedback] = useState();
    const [color, setColor] = useState();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    
    const selectColor = (val) => {
        switch (val) {
            case 'dislike': {
                return theme.palette.error.main
            }
            case 'like': {
                return theme.palette.success.main
            }
            case 'star': {
                return theme.palette.info.main
            }
            default: {
                return theme.palette.text.hint
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
            marginTop: theme.spacing(3),
        },
        paper: {
            margin: 0.8,
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            height: 98
        },
        checkbox: {
            margin: -5,
            align: 'right'
        },
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

                if (v > 1000000) {
                    return (v / 1000000).toFixed(2) + 'B'
                } else {

                    return v.toFixed(2)
                }

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
    if (feedback === undefined) {
        let color = selectColor(val)
        setColor(color)
        newFeedback = val
    } else {
        setColor(undefined)
        newFeedback = undefined
    }
    setFeedback(newFeedback)

    props.changeParams({
        id: props.i,
        content: { statisticSelected: statisticSelected, feedback: newFeedback }
    })
}

const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
};

return (
    <CardWrapper {...props} openSettings={handleClickListItem}>
        <StatisticsSettings anchorEl={[anchorEl, setAnchorEl]} open={settingsOpen} saveSettings={saveSettings} statistics={statistics}></StatisticsSettings>
        <div className={classes.root}>
            <Grid container spacing={0} >
                {statisticSelected &&
                    <Grid item xs key={statisticSelected.label}>
                        <Typography variant="h5" style={{ color: color }}>
                            <b>{statistics.find(s => s.label === statisticSelected)
                                && statistics.find(s => s.label === statisticSelected).value}</b>
                            <Box textAlign="center" width='1000px' component="span">
                                {(feedback === 'star' || feedback === undefined) &&
                                    <Radio className={classes.checkbox} value='star' style={{ color: color || theme.palette.text.hint }}
                                        checked={feedback === 'star'} onClick={(e) => handleFeedback(e.target.value)}
                                        size="small" icon={<GradeOutlinedIcon size="small" />}
                                        checkedIcon={<GradeIcon size="small" />} name="checkedH" />
                                }
                                {(feedback === 'like' || feedback === undefined) &&

                                    <Radio className={classes.checkbox} value='like' style={{ color: theme.palette.text.hint }}
                                        checked={feedback === 'like'} onClick={(e) => handleFeedback(e.target.value)}
                                        size="small" icon={<ThumbUpOutlinedIcon size="small" />}
                                        checkedIcon={<ThumbUpIcon size="small" />} name="checkedH" />
                                }
                                {(feedback === 'dislike' || feedback === undefined) &&

                                    <Radio className={classes.checkbox} value='dislike' style={{ color: theme.palette.text.hint }}
                                        checked={feedback === 'dislike'} onClick={(e) => handleFeedback(e.target.value)}
                                        size="small" icon={<ThumbDownOutlinedIcon size="small" />}
                                        checkedIcon={<ThumbDownIcon size="small" />} name="checkedH" />
                                }
                            </Box>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" noWrap>
                            {t('indicators.' + statisticSelected)}
                        </Typography>
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