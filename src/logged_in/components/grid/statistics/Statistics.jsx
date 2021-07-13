import { React, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { fetchStatistics } from '../../../../shared/functions/requests.js';
import { useTranslation } from 'react-i18next';
import { formatValueByType } from '../../../../shared/functions/formatValueByType'
import { StatisticsInterface } from './StatisticsInterface'

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
    
    console.log("STAT Props", props)

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
                console.log("setats fetch", res)
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

    return (
        <StatisticsInterface
            classes={classes}
            anchorSettings={anchorSettings}
            anchorFeedback={anchorFeedback}
            theme={theme}
            color={color}
            feedback={feedback}
            feedbackOpen={feedbackOpen}
            settingsOpen={settingsOpen}
            statisticSelected={statisticSelected}
            statistics={statistics}
            setAnchorSettings={setAnchorSettings}
            saveSettings={saveSettings}
            handleFeedback={handleFeedback}
            handleClickListItem={handleClickListItem}
            handleMouseOverFeedback={handleMouseOverFeedback}
            t={t}
        />
    );
}


export { Statistics }