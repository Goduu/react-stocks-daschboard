import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, Avatar, TextField, AccordionDetails, AccordionSummary, Accordion, Typography } from '@material-ui/core';
import Card from '../Card'
import {SwotInterface} from './SwotInterface'
import { amber, lime, teal, orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordionExpandIcon: {
        marginRight: theme.spacing(1)
    },
    accordion: {
        marginRight: theme.spacing(1),
        boxShadow: 'none',
        borderRadius: '4px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        display: 'flex',

    },
    strengths: {
        color: theme.palette.getContrastText(amber['A700']),
        backgroundColor: amber['A700'],
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1)

    },
    weaknesses: {
        color: theme.palette.getContrastText(lime['A700']),
        backgroundColor: lime['A700'],
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1)

    },
    opportunities: {
        color: theme.palette.getContrastText(teal['A700']),
        backgroundColor: teal['A700'],
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1)
    },
    threats: {
        color: theme.palette.getContrastText(orange['A700']),
        backgroundColor: orange['A700'],
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1)

    }
}));

function Swot(props) {
    const classes = useStyles();
    const [str1, setStr1] = useState(props.params.str1 || [])
    const [str2, setStr2] = useState(props.params.str2 || [])
    const [str3, setStr3] = useState(props.params.str3 || [])
    const [wek1, setWek1] = useState(props.params.wek1 || [])
    const [wek2, setWek2] = useState(props.params.wek2 || [])
    const [wek3, setWek3] = useState(props.params.wek3 || [])
    const [opt1, setOpt1] = useState(props.params.opt1 || [])
    const [opt2, setOpt2] = useState(props.params.opt2 || [])
    const [opt3, setOpt3] = useState(props.params.opt3 || [])
    const [trt1, setTrt1] = useState(props.params.trt1 || [])
    const [trt2, setTrt2] = useState(props.params.trt2 || [])
    const [trt3, setTrt3] = useState(props.params.trt3 || [])

    const saveParams = () => {
        props.changeParams({
            id: props.i,
            content: {
                str1: str1, str2: str2, str3: str3,
                wek1: wek1, wek2: wek2, wek3: wek3,
                opt1: opt1, opt2: opt2, opt3: opt3,
                trt1: trt1, trt2: trt2, trt3: trt3
            }
        })
    }
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <SwotInterface
        classes={classes} expanded={expanded}
        str1={str1} setStr1={setStr1}
        str2={str2} setStr2={setStr2}
        str3={str3} setStr3={setStr3}
        wek1={wek1} setWek1={setWek1}
        wek2={wek2} setWek2={setWek2}
        wek3={wek3} setWek3={setWek3}
        opt1={opt1} setOpt1={setOpt1}
        opt2={opt2} setOpt2={setOpt2}
        opt3={opt3} setOpt3={setOpt3}
        trt1={trt1} setTrt1={setTrt1}
        trt2={trt2} setTrt2={setTrt2}
        trt3={trt3} setTrt3={setTrt3}
        saveParams={saveParams} handleChange={handleChange}
        {...props}
        />
    );
}


export {Swot}
