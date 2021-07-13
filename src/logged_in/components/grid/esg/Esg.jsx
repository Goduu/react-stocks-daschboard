import { React, useState, useEffect } from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import { amber, lime,  orange } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { EsgInterface } from './EsgInterface'

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

function Esg(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [esgs, setEsgs] = useState(undefined)
    const ticker = props.identifier
    const token = useSelector(state => state.auth.token)
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        fetchEsgRisk(ticker, token)
            .then(res => {
                setEsgs(res)
            })
            .catch((e) => enqueueSnackbar("No ESG data for This stock", { variant: 'warning' })
            )
    }, [ticker, token])

    function valuetext(value) {
        return `${value}°C`;
    }

    const getColor = (esg) => {
        return (
            esg.value <
                (esg.peers.find(p => p.label === 'Avg').value - 0.1 * esg.peers.find(p => p.label === 'Avg').value)
                ? lime['A700']
                :
                esg.value >
                    (esg.peers.find(p => p.label === 'Avg').value + 0.1 * esg.peers.find(p => p.label === 'Avg').value)
                    ? orange['A700']
                    : amber['A700'])

    }
    return (
        <EsgInterface
            classes={classes}
            t={t}
            esgs={esgs}
            valuetext={valuetext}
            getColor={getColor}
            {...props}
        />
    );

}


export { Esg }