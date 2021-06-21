import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TableChartIcon from '@material-ui/icons/TableChart';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Tooltip from '@material-ui/core/Tooltip';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LabelIcon from '@material-ui/icons/Label';

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
];

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),

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
            <span className={classes.fab} >
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
            </span>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </span>
    );
}
