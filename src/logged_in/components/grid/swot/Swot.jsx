import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, Avatar, TextField, AccordionDetails, AccordionSummary, Accordion, Typography } from '@material-ui/core';
import Card from '../Card'

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
        <Card {...props}>
            <div >
                <Accordion square expanded={expanded === 'strengths'} onChange={handleChange('strengths')} className={classes.accordion} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" className={classes.accordionExpandIcon} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            <Avatar className={classes.strengths}>
                                <b>S</b>
                            </Avatar>
                            Strengths
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setStr1(e.target.value)}
                            onBlur={saveParams}
                            value={str1}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setStr2(e.target.value)}
                            onBlur={saveParams}
                            value={str2}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setStr3(e.target.value)}
                            onBlur={saveParams}
                            value={str3}
                            fullWidth
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'weaknesses'} onChange={handleChange('weaknesses')} className={classes.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" className={classes.accordionExpandIcon} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>
                            <Avatar className={classes.weaknesses}>
                                <b>W</b>
                            </Avatar>
                            Weaknesses</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setWek1(e.target.value)}
                            onBlur={saveParams}
                            value={wek1}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setWek2(e.target.value)}
                            onBlur={saveParams}
                            value={wek2}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setWek3(e.target.value)}
                            onBlur={saveParams}
                            value={wek3}
                            fullWidth
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'opportunities'} onChange={handleChange('opportunities')} className={classes.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" className={classes.accordionExpandIcon} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>
                            <Avatar className={classes.opportunities}>
                                <b>O</b>
                            </Avatar>
                            Opportunities
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setOpt1(e.target.value)}
                            onBlur={saveParams}
                            value={opt1}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setOpt2(e.target.value)}
                            onBlur={saveParams}
                            value={opt2}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setOpt3(e.target.value)}
                            onBlur={saveParams}
                            value={opt3}
                            fullWidth
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'threats'} onChange={handleChange('threats')} className={classes.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" className={classes.accordionExpandIcon} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>
                            <Avatar className={classes.threats}>
                                <b>T</b>
                            </Avatar>
                            Threats
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setTrt1(e.target.value)}
                            onBlur={saveParams}
                            value={trt1}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setTrt2(e.target.value)}
                            onBlur={saveParams}
                            value={trt2}
                            fullWidth
                        />
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            onChange={(e) => setTrt3(e.target.value)}
                            onBlur={saveParams}
                            value={trt3}
                            fullWidth
                        />
                    </AccordionDetails>
                </Accordion>

            </div>
        </Card>
    );
}


export {Swot}
