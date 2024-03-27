import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TableChartIcon from '@mui/icons-material/TableChart';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Tooltip from '@mui/material/Tooltip';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LabelIcon from '@mui/icons-material/Label';

const options = [
    { value: 'note', label: 'Note', icon: <TextFieldsIcon /> },
    // { value: 'card', label: 'Card', icon: <ViewDayIcon /> },
    { value: 'table', label: 'Table', icon: <TableChartIcon /> },
    { value: 'news', label: 'News', icon: <RssFeedIcon /> },
    { value: 'pricechart', label: 'Price Chart', icon: <TrendingUpIcon /> },
    { value: 'dividendchart', label: 'Dividend Chart', icon: <EqualizerIcon /> },
    { value: 'swot', label: 'SWOT Analysis', icon: <AssignmentIcon /> },
    { value: 'indicators', label: 'Indicators', icon: <LabelIcon /> },
    { value: 'esg', label: 'ESG Risk', icon: <LabelIcon /> },
    { value: 'multichart', label: 'Multicharts', icon: <TrendingUpIcon /> },
    { value: 'statistics', label: 'Statistics', icon: <TrendingUpIcon /> },
];

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        display: 'flex',
        alignSelf: 'flex-end'

    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: theme.spacing(2),
        color: theme.palette.background.paper
    }
}));


SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add Visual</DialogTitle>
            <List>
                {options.map((option) => (
                    <ListItem button onClick={() => handleListItemClick(option.value)} key={option.value}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {option.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function ActionMenu(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedValue] = React.useState(null);
    const { onClose } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value) {
            onClose(value);
        }
    };

    return (
        <span>
            <div className={classes.fab} >
                <Tooltip title="Delete Dashboard">
                    <Fab aria-label='Delete Dashboard' className={classes.small} onClick={props.handleDeletDashboard}>
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Add Dashboard">
                    <Fab aria-label='Add Dashboard' className={classes.small} onClick={props.handleAddDashboard}>
                        <LibraryAddIcon />
                    </Fab >
                </Tooltip>
                <Tooltip title="Add Visual">
                    <Fab aria-label='Add Visual' color='primary' onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </span>
    );
}
