import { React, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { fetchStatistics } from '../../../../shared/functions/requests.js';
import { useTranslation } from 'react-i18next';
import { formatValueByType } from '../../../../shared/functions/formatValueByType'
import { StatisticsInterface } from './StatisticsInterface'

function Statistics(props) {
    const theme = useTheme();

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

    const { t } = useTranslation();
    // const [statistics, setStatistics] = useState([])
    const [statistics, setStatistics] = useState(props.tickerData)
    const [statisticSelected, setStatisticSelected] = useState(props.params.statisticSelected || 'beta')
    const token = useSelector(state => state.auth.token)
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState(props.params.feedback);
    const [color, setColor] = useState(selectColor(props.params.feedback));
    const [openSettings, setOpenSettings] = useState(false);
    const [anchorFeedback, setAnchorFeedback] = useState(null);
    const [type, setType] = useState(props.params.type || 'keyStatistics');

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

    const saveSettings = (value) => {
        setStatisticSelected(value)
        setFeedback(undefined)
        props.changeParams({
            id: props.i,
            content: { type: type, statisticSelected: value, feedback: undefined }
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
            content: { type: type, statisticSelected: statisticSelected, feedback: newFeedback }
        })
        setFeedbackOpen(false)

    }


    const handleMouseOverFeedback = (event) => {
        if (feedback == undefined) {
            setFeedbackOpen(true)
            setAnchorFeedback(event.currentTarget)
        }

    }



    return (
        <StatisticsInterface
            classes={classes}
            anchorFeedback={anchorFeedback}
            theme={theme}
            color={color}
            feedback={feedback}
            feedbackOpen={feedbackOpen}
            settingsOpen={settingsOpen}
            type={type}
            statisticSelected={statisticSelected}
            statistics={statistics}
            setSettingsOpen={setSettingsOpen}
            saveSettings={saveSettings}
            setType={setType}
            handleFeedback={handleFeedback}
            handleMouseOverFeedback={handleMouseOverFeedback}
            t={t}
            {...props}
        />
    );
}


export { Statistics }