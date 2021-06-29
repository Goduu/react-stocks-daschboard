// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import TableChartIcon from '@material-ui/icons/TableChart';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
// import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
// import DeleteIcon from '@material-ui/icons/Delete';
// import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// import Tooltip from '@material-ui/core/Tooltip';
// import RssFeedIcon from '@material-ui/icons/RssFeed';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import LabelIcon from '@material-ui/icons/Label';

// const options = [
//     { value: 'note', label: 'Note', icon: <TextFieldsIcon /> },
//     // { value: 'card', label: 'Card', icon: <ViewDayIcon /> },
//     { value: 'table', label: 'Table', icon: <TableChartIcon /> },
//     { value: 'news', label: 'News', icon: <RssFeedIcon /> },
//     { value: 'pricechart', label: 'Price Chart', icon: <TrendingUpIcon /> },
//     { value: 'dividendchart', label: 'Dividend Chart', icon: <EqualizerIcon /> },
//     { value: 'swot', label: 'SWOT Analysis', icon: <AssignmentIcon /> },
//     { value: 'indicators', label: 'Indicators', icon: <LabelIcon /> },
//     { value: 'esg', label: 'ESG Risk', icon: <LabelIcon /> },
//     { value: 'multichart', label: 'Multicharts', icon: <TrendingUpIcon /> },
//     { value: 'statistics', label: 'Statistics', icon: <TrendingUpIcon /> },
// ];

// const useStyles = makeStyles((theme) => ({
//     fab: {
//         position: 'absolute',
//         bottom: theme.spacing(2),
//         right: theme.spacing(2),
//         display: 'flex',
//         alignSelf: 'flex-end'

//     },
// small: {
//     width: theme.spacing(5),
//     height: theme.spacing(5),
//     marginRight: theme.spacing(2),
//     color: theme.palette.background.paper
// }
// }));


// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
// };

// function SimpleDialog(props) {
//     const classes = useStyles();
//     const { onClose, selectedValue, open } = props;

//     const handleClose = () => {
//         onClose(selectedValue);
//     };

//     const handleListItemClick = (value) => {
//         onClose(value);
//     };

//     return (
//         <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//             <DialogTitle id="simple-dialog-title">Add Visual</DialogTitle>
//             <List>
//                 {options.map((option) => (
//                     <ListItem button onClick={() => handleListItemClick(option.value)} key={option.value}>
//                         <ListItemAvatar>
//                             <Avatar className={classes.avatar}>
//                                 {option.icon}
//                             </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText primary={option.label} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Dialog>
//     );
// }

// export default function ActionMenu(props) {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue] = React.useState(null);
//     const { onClose } = props;

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = (value) => {
//         setOpen(false);
//         if (value) {
//             onClose(value);
//         }
//     };

//     return (
//         <span>
//             <div className={classes.fab} >
//                 <Tooltip title="Delete Dashboard">
//                     <Fab aria-label='Delete Dashboard' className={classes.small} onClick={props.handleDeletDashboard}>
//                         <DeleteIcon />
//                     </Fab>
//                 </Tooltip>
//                 <Tooltip title="Add Dashboard">
//                     <Fab aria-label='Add Dashboard' className={classes.small} onClick={props.handleAddDashboard}>
//                         <LibraryAddIcon />
//                     </Fab >
//                 </Tooltip>
//                 <Tooltip title="Add Visual">
//                     <Fab aria-label='Add Visual' color='primary' onClick={handleClickOpen}>
//                         <AddIcon />
//                     </Fab>
//                 </Tooltip>
//             </div>
//             <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//         </span>
//     );
// }

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Tooltip, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TableChartIcon from '@material-ui/icons/TableChart';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LabelIcon from '@material-ui/icons/Label';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import EcoIcon from '@material-ui/icons/Eco';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'fixed',
        right: theme.spacing(4),
        bottom: theme.spacing(4),
    },
    small: {
        // width: theme.spacing(3),
        // height: theme.spacing(5),
        color: theme.palette.background.paper
    },
    wrapper:{
        display: 'flex'
    },
    tooltip: {
        whiteSpace: 'nowrap',
        backgroundColor: 'red'
    }
}));

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
];
const options = [
    { value: 'note', label: 'Note', icon: <TextFieldsIcon /> },
    // { value: 'card', label: 'Card', icon: <ViewDayIcon /> },
    // { value: 'table', label: 'Table', icon: <TableChartIcon /> },
    // { value: 'news', label: 'News', icon: <RssFeedIcon /> },
    { value: 'pricechart', label: 'Price Chart', icon: <TrendingUpIcon /> },
    { value: 'dividendchart', label: 'Dividend Chart', icon: <EqualizerIcon /> },
    { value: 'swot', label: 'SWOT-Analysis', icon: <AssignmentIcon /> },
    { value: 'indicators', label: 'Indicators', icon: <LabelIcon /> },
    { value: 'esg', label: 'ESG Risk', icon: <EcoIcon /> },
    { value: 'multichart', label: 'Multicharts', icon: <MultilineChartIcon /> },
    { value: 'statistics', label: 'Statistics', icon: <TrendingUpIcon /> },
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
                            tooltipClasses={classes.tooltip}
                            onClick={() => chooseComponent(action.value)}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}

