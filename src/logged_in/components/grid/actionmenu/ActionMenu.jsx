import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'fixed',
        right: theme.spacing(4),
        bottom: theme.spacing(4),
        zIndex: 3
    },
    small: {
        // width: theme.spacing(3),
        // height: theme.spacing(5),
        color: theme.palette.background.paper
    },
    wrapper: {
        display: 'flex'
    },
    tooltip: {
        whiteSpace: 'nowrap',
        backgroundColor: 'red'
    }
}));

const options = [
    { value: 'note', label: 'Note', icon: <TextFieldsIcon /> },
    // { value: 'card', label: 'Card', icon: <TextFieldsIcon /> },
    // { value: 'table', label: 'Table', icon: <TableChartIcon /> },
    // { value: 'news', label: 'News', icon: <RssFeedIcon /> },
    // { value: 'pricechart', label: 'Price Chart', icon: <TrendingUpIcon /> },
    // { value: 'dividendchart', label: 'Dividend Chart', icon: <EqualizerIcon /> },
    { value: 'swot', label: 'SWOT-Analysis', icon: <AssignmentIcon /> },
    // { value: 'indicators', label: 'Indicators', icon: <LabelIcon /> },
    { value: 'esg', label: 'ESG Risk', icon: <AssignmentIcon /> },
    { value: 'multichart', label: 'Multicharts', icon: <MultilineChartIcon /> },
    { value: 'statistics', label: 'Statistics', icon: <TrendingUpIcon /> },
    { value: 'title', label: 'Title', icon: <TrendingUpIcon /> },
];

export default function SpeedDialTooltipOpen(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const theme = useTheme();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const chooseComponent = (comp) => {
        props.onClose(comp)
    }

    return (
        <div className={classes.speedDial} hidden={props.hidden}>
            <div className={classes.wrapper}>
                {/* <Tooltip title="Delete Dashboard">
                    <Fab aria-label='Delete Dashboard' className={classes.small} onClick={props.handleDeletDashboard}>
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Add Dashboard">
                    <Fab aria-label='Add Dashboard' className={classes.small} onClick={props.handleAddDashboard}>
                        <LibraryAddIcon />
                    </Fab >
                </Tooltip> */}
                {/* <SpeedDial
                className={classes.small}
                    ariaLabel="SpeedDial tooltip"
                    hidden={hidden}
                    // className={classes.small}
                    icon={<LibraryAddIcon  onClick={props.handleAddDashboard}/>}
                >
                </SpeedDial> */}
                <SpeedDial
                    ariaLabel="SpeedDial tooltip"
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {options.map((action) => (
                        <SpeedDialAction
                            key={action.label}
                            icon={action.icon}
                            tooltipTitle={action.label}
                            tooltipOpen
                            tooltipclasses={classes.tooltip}
                            onClick={() => chooseComponent(action.value)}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}

