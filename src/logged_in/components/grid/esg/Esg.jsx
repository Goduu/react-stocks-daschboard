import { React, useState,useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EcoIcon from '@material-ui/icons/Eco';
import { green,red,yellow } from '@material-ui/core/colors';
import { amber, lime, teal, orange } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import {useSelector} from 'react-redux'
import { useCallback } from 'react';

let esgs = {
    performance: 'UNDER_PERF',
    scores: [
        {
            title: 'EsgScore',
            value: 17.37,
            peers: [
                {
                    value: 13.41,
                    label: 'Min',
                },
                {
                    value: 22.23,
                    label: 'Avg',
                },
                {
                    value: 36.78,
                    label: 'Max',
                },
            ]
        },
        {
            title: 'Governance',
            value: 6.5,
            peers: [
                {
                    value: 3.81,
                    label: 'Min',
                },
                {
                    value: 7.21,
                    label: 'Avg',
                },
                {
                    value: 9.79,
                    label: 'Max',
                },
            ]
        },
        {
            title: 'Social',
            value: 10.42,
            peers: [
                {
                    value: 4.29,
                    label: 'Min',
                },
                {
                    value: 8.60,
                    label: 'Avg',
                },
                {
                    value: 11.45,
                    label: 'Max',
                },
            ]

        },
        {
            title: 'Environment',
            value: 2.45,
            peers: [
                {
                    value: 2.05,
                    label: 'Min',
                },
                {
                    value: 5.60,
                    label: 'Avg',
                },
                {
                    value: 9.17,
                    label: 'Max',
                },
            ]
        },
    ]
}

const useStyles = makeStyles((theme) => ({
    root: {

    },
    header: {
        margin: theme.spacing(2),
    },
    slider: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    chip: {
        marginTop: theme.spacing(3),
        margin: theme.spacing(2),
    }

}));

function EsgCard(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [esgs, setEsgs] = useState(undefined)
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)


    useEffect(() => {
        fetchEsgRisk(ticker,token)
            .then(res => {
                console.log("fetchEsgRisk", res)
                setEsgs(res)
            })
    }, [ticker,token])

    function valuetext(value) {
        return `${value}°C`;
    }

    const getColor = (esg) => {
        return (
        esg.value < 
            (esg.peers.find(p => p.label === 'Avg').value - 0.1*esg.peers.find(p => p.label === 'Avg').value)
            ? lime['A700'] 
            :
        esg.value > 
            (esg.peers.find(p => p.label === 'Avg').value + 0.1*esg.peers.find(p => p.label === 'Avg').value)
            ? orange['A700']
            : amber['A700'])

    }
    if(esgs){
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <div className={classes.header}>
                    <Typography variant="h6" >
                        ESG Risk
                        <EcoIcon  style={{ color: green[500] }}/>
                    <Chip variant="outlined" size="small" label={t('esg.'+esgs.performance)} />
                    </Typography>

                </div>
            </Grid>
            {esgs.scores.map(esg => {
                return (
                    <Grid item xs={6}>
                        <div className={classes.slider}>
                            <Typography gutterBottom>
                                {t('esg.'+esg.title)}
                            </Typography>

                            <Slider
                                track={false}
                                aria-labelledby="track-false-slider"
                                getAriaValueText={valuetext}
                                value={esg.value}
                                min={esg.peers.find(p => p.label === 'Min').value}
                                step={0.1}
                                max={esg.peers.find(p => p.label === 'Max').value}
                                marks={esg.peers}
                                valueLabelDisplay="auto"
                                style={{ color: getColor(esg)  }}

                            />
                        </div>
                    </Grid>
                )
            })}

        </Grid>


    );}
    else {
        return null
    }
}


export function EsgGrid(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>
                <span className="grid-menu">
                    <span >
                        {/* <TableSettingMenus options={options} /> */}
                    </span>
                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-content">
                    <EsgCard key={props.i} {...props} />
                </div>

            </Paper>
        )
    })

}