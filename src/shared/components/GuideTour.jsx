import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Button, StepButton, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';



let initialSteps =
    [{ label: 'Select a stock', complete: false },
    { label: 'Select a visual', complete: false },
    { label: 'Select a secound visual', complete: false },
    { label: 'Add another stock', complete: false },
    { label: 'Delete the stock dashboard', complete: false },
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
    const [zindex, setZindex] = React.useState(5);
    const [steps, setSteps] = React.useState(initialSteps);

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
            bottom: theme.spacing(3),
            display: 'flex',
            width: '100vw',
            zIndex: zindex

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
    const [activeStep, setActiveStep] = React.useState(0);
    const [tourActive, tougleTourActive] = React.useState(false);


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
                <div className={classes.stepperwrapper}>
                    <Button
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
                    </Button>
                </div>
            }
        </div>
    );
}
