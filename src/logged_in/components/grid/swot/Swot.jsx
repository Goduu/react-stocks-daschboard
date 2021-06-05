import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';

import { amber, lime, teal, orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '5px',
        background: theme.palette.background.paper
    },
    accordion: {
        marginTop: '15px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        display: 'flex',
        height: '20px'

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

    },
    // slider:{
    //     height: '85px',
    //     zIndex: 3
    // }
}));

function Swot() {
    const classes = useStyles();
    function valuetext(value) {
        return `${value}°C`;
    }
    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => console.log("Alcapaha")}

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
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                    <span className={classes.slider}>
                        
                        <Slider
                            orientation="vertical"
                            getAriaValueText={valuetext}
                            defaultValue={30}
                            aria-labelledby="vertical-slider"
                        />
                        </span>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                    <TextField
                        id="standard-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                </AccordionDetails>
            </Accordion>

        </div>
    );
}


export function SwotGrid(props) {

    const handleExpand = () => {

    }

    return ({
        type: 'note',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props}>
                <span className="grid-menu">
                    <span >
                        {/* <TableSettingMenus options={options} /> */}
                    </span>
                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-content">
                    <Swot key={props.i} {...props} expand={handleExpand} />
                </div>
            </div>
        )
    })

}