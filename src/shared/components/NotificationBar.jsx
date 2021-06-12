import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import { closeNotification } from '../redux/actions/notification.actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

/**
   * Notification control.
   *
   * example of use:
   * dispatch(notify({ type: 'success', 'msg': 'Dashboard Deleted' }))
   */
export default function NotificationBar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const type = useSelector(state => state.notification.type)
    const msg = useSelector(state => state.notification.msg)
    const open = useSelector(state => state.notification.open)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeNotification())
    };

    return (
        <div className={classes.alert}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
