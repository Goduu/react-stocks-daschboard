import { React, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Popover, ClickAwayListener, TextField, Paper, Avatar, Grid, IconButton,InputAdornment } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import MessageIcon from '@material-ui/icons/Message';
import { useDispatch } from 'react-redux';
import { isSidedrawerOpen } from '../redux/actions/ui.actions.js'
import SendIcon from '@material-ui/icons/Send';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    comments: {
        cursor: 'pointer'
    },
    commentBox: {
        padding: theme.spacing(2)
    },
    iconButton: {
        height: '55px'
    }
}));

function HoverRating() {
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [reviewOpen, setReviewOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorReview, setAnchorReview] = useState(null);
    const reviewRef = useRef(null)


    const handleReview = (event, newValue) => {
        console.log("Review", reviewOpen)
        setValue(newValue)
        setAnchorReview(reviewRef.current)
        setReviewOpen(true)

    }


    return (
        <ClickAwayListener onClickAway={() => console.log("asdsadsad")} >
            <Grid container spacing={2} className={classes.root} ref={reviewRef}>
                <Grid item>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) =>
                            handleReview(event, newValue)
                        }
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                
                <Popover
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    anchorEl={anchorReview}
                    open={reviewOpen}
                >
                    <Paper elevation={1} className={classes.commentBox}>
                        <TextField
                            required
                            id="filled-required"
                            label="Review"
                            variant="outlined"
                            multiline
                            rows={5}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => {
                                            console.log("send");
                                        }}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Paper>
                </Popover>
                </Grid>
                <Grid item className={classes.comments}>
                    <Avatar onClick={() => dispatch(isSidedrawerOpen(true))}><MessageIcon /></Avatar>
                </Grid>
            </Grid>
        </ClickAwayListener>
    );
}


let initialSteps =
    [{ label: 'Select a stock', complete: false },
    ];

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

export default function GuideTour(props) {
    const [zindex, setZindex] = useState(5);
    const [steps, setSteps] = useState(initialSteps);

    const useStyles = makeStyles((theme) => ({
        root: {
            filter: 'blur(2px)',
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            background: theme.palette.background.default,
            opacity: 0.5,
            zIndex: 5
        },
        stepperwrapper: {
            position: 'fixed',
            bottom: theme.spacing(5),
            display: 'flex',
            height: '80px',
            zIndex: zindex,
            padding: theme.spacing(3),
            right: theme.spacing(10),

        },
        button: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            height: 40
        },
        stepper: {
            backgroundColor: theme.palette.background.default
        },
    }));
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [tourActive, tougleTourActive] = useState(false);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleStep = (step) => () => {
        // setActiveStep(step);
    };

    useEffect(() => {
        tougleTourActive(props.active)
    }, [props.active])

    useEffect(() => {
        tougleTourActive(props.active)
    }, [props.active])

    return (
        <div>
            <div className={activeStep && classes.root} onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()}>
            </div>
            {props.children}
            {tourActive &&
                <Paper className={classes.stepperwrapper} elevation={3}>
                    {/* <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                        color="primary"
                        variant="contained"
                    >
                        Back
                    </Button>
                    <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                        {steps.map((step, index) => (
                            <Tooltip title={step.label} key={step.label}>
                                <Step >
                                    <StepButton onClick={handleStep(index)} completed={step.completed}>
                                    </StepButton>
                                </Step>
                            </Tooltip>
                        ))}
                    </Stepper> 
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeStep === steps.length}
                        className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button> */}
                    <HoverRating />

                </Paper >
            }
        </div>
    );
}
