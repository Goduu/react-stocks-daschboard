import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar, TextField, AccordionDetails, AccordionSummary, Accordion, Typography } from '@material-ui/core';
import Card from '../Card'
import PropTypes from "prop-types";

function SwotInterface(props) {
    const {
        classes, expanded,
        str1, setStr1,
        str2, setStr2,
        str3, setStr3,
        wek1, setWek1,
        wek2, setWek2,
        wek3, setWek3,
        opt1, setOpt1,
        opt2, setOpt2,
        opt3, setOpt3,
        trt1, setTrt1,
        trt2, setTrt2,
        trt3, setTrt3,
    } = props
    const { saveParams, handleChange } = props

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


SwotInterface.propTypes = {
    str1: PropTypes.string.isRequired,
    str2: PropTypes.string.isRequired,
    str3: PropTypes.string.isRequired,
    setStr1: PropTypes.func.isRequired,
    setStr2: PropTypes.func.isRequired,
    setStr3: PropTypes.func.isRequired,
    wek1: PropTypes.string.isRequired,
    wek2: PropTypes.string.isRequired,
    wek3: PropTypes.string.isRequired,
    setWek1: PropTypes.func.isRequired,
    setWek2: PropTypes.func.isRequired,
    setWek3: PropTypes.func.isRequired,
    opt1: PropTypes.string.isRequired,
    opt2: PropTypes.string.isRequired,
    setOpt1: PropTypes.func.isRequired,
    setOpt2: PropTypes.func.isRequired,
    setOpt3: PropTypes.func.isRequired,
    trt1: PropTypes.string.isRequired,
    trt2: PropTypes.string.isRequired,
    trt3: PropTypes.string.isRequired,
    setTrt1: PropTypes.func.isRequired,
    setTrt2: PropTypes.func.isRequired,
    setTrt3: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    changeText: PropTypes.func.isRequired,
    saveParams: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export { SwotInterface }
