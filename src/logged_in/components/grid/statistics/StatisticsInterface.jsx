import { React } from 'react';
import { Paper, Grid, Typography, Radio, Tooltip, Link, Popover } from '@mui/material';
import CardWrapper from '../Card'
import StatisticsSettings from './StatisticsSettings'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import Skeleton from '@mui/material/Skeleton';
import formatStatistics from '../../../../shared/functions/formatStatistics';

function StatisticsInterface(props) {

    const { classes, anchorFeedback, theme, color, feedback,
        feedbackOpen, settingsOpen, statisticSelected, statistics, statisticGroup } = props
    const { saveSettings, handleFeedback,
        handleMouseOverFeedback, t, setStatisticGroup, setSettingsOpen } = props


    return (
        <CardWrapper {...props} openSettings={() => setSettingsOpen(true)} >
            <StatisticsSettings
                open={settingsOpen}
                handleClose={() => setSettingsOpen(false)}
                setOpen={setSettingsOpen}
                saveSettings={saveSettings}
                statistics={props.statistics}
                setStatisticGroup={setStatisticGroup}
                statisticGroup={statisticGroup}></StatisticsSettings>
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
                                    {statistics && statistics[statisticGroup] && statistics[statisticGroup][statisticSelected]
                                        && formatStatistics(statisticGroup + '.' + statisticSelected, statistics[statisticGroup][statisticSelected].raw)}
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
                                <Tooltip title={t(statisticGroup + '.' + statisticSelected + ".long")}>
                                    <Link href={t(statisticGroup + '.' + statisticSelected + ".ref")} target="_blank" color="inherit" >
                                        {t(statisticGroup + '.' + statisticSelected + ".label")}
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


export { StatisticsInterface }