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
import { formatValueByType } from '../../../../shared/functions/formatValueByType'

function StatisticsInterface(props) {

    const {classes, anchorSettings, anchorFeedback, theme, color, feedback, feedbackOpen, settingsOpen, statisticSelected, statistics } = props
    const { setAnchorSettings, saveSettings, handleFeedback, handleClickListItem, handleMouseOverFeedback, t } = props


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


export { StatisticsInterface }