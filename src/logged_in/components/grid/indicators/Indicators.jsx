import { React, useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import { fetchIndicators } from '../../../../shared/functions/requests.js';
import InfoIcon from '@material-ui/icons/Info';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation, Trans } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import TransferList from './TransferList'
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

let init = {
    'hist': [
        { 'name': 'averageAnalystRating', 'value': '1.7 - Buy' },
        { 'name': 'averageDailyVolume10Day', 'value': 1299200 },
        { 'name': 'averageDailyVolume3Month', 'value': 1609206 },
        { 'name': 'epsCurrentYear', 'value': 87.69 },
        { 'name': 'epsForward', 'value': 94.9 },
        { 'name': 'marketCap', 'value': 1604348936192 },]
}


export default function Indicators(props) {
    const { t } = useTranslation();
    const [text, setText] = useState(props.params.text)
    const [indicators, setIndicators] = useState(init)
    const [edit, setEdit] = useState(false)
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            height: '100%',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '5px',
            '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '5px',
            },
            '&::-webkit-scrollbar': {
                width: '10px',
                paddingTop: '10px'
            }
        },
        title: {
            margin: '8px',
        },
        list: {
            backgroundColor: theme.palette.background.paper,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
            borderTop: '#ffffff'
        },
        icon: {
            cursor: 'pointer',
            fontSize: '0.5em'
        },
        editMenu: {
            position: 'absolute',
            right: '1px',
            cursor: 'pointer',
            zIndex: 2,
            paddingRight: '8px'
        },
        transferList: {
            position: 'absolute',
            zIndex: 5,


        }
    }));
    const classes = useStyles();
    const ticker = props.identifier

    useEffect(() => {
        fetchIndicators(ticker)
            .then(res => {
                let ind = {}
                Object.keys(res).forEach((group) => {
                    ind[group] = []
                    Object.keys(res[group]).forEach((item) => {
                        if (res[group][item]) {
                            ind[group].push({
                                name: item,
                                value: res[group][item]
                            })
                        }
                    })
                })
                setIndicators(ind)
            })
    }, [ticker])

    const handleEdit = () => {
        props.editIndicatorList(indicators)
    }

    return (
        <>
            {edit && <div className={classes.transferList}> <TransferList /></div>}
            <div className={classes.root}>
                <span className={classes.editMenu}>
                    <span onClick={() => handleEdit()}>
                        <EditIcon fontSize="small" />
                    </span>
                </span>

                <div className={classes.title}>
                    <Typography variant="h6">
                        {t('indicators.title')}
                    </Typography> </div>
                <List className={classes.list} subheader={<li />} dense={true}>
                    {Object.keys(indicators).map((group) => (
                        <li key={`section-${group}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{`${t('indicators.' + group)}`}</ListSubheader>
                                {indicators[group].map((item) => (
                                    <>
                                        {item.value &&
                                            <ListItem key={`item-${group}-${item.name}`}>
                                                <ListItemText primary={`${item.value}`}
                                                    secondary={t('indicators.' + item.name)} />

                                                <ListItemIcon className={classes.icon} >
                                                    <Link href={t('indicators.ref.' + item.name)} target="_blank" color="inherit">
                                                        <Tooltip title={t('indicators.info.' + item.name)}>
                                                            <InfoIcon />
                                                        </Tooltip>
                                                    </Link>
                                                </ListItemIcon>
                                            </ListItem>
                                        }
                                    </>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
            </div>
        </>
    );
}


export function IndicatorsGrid(props) {

    return (
            <div key={props.i} data-grid={props}>
                <span className="grid-menu">

                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-content">
                    <Indicators key={props.i} {...props} editIndicatorList={props.editIndicatorList} />
                </div>

            </div>
        )

}