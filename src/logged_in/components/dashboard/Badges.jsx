import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
    Paper,
    Toolbar,
    ListItemText,
    ListItemSecondaryAction,
    Badge,
    Switch,
    Box,
    withStyles,
    Tooltip
} from "@material-ui/core";
import Filter1Icon from '@material-ui/icons/Filter1';
import Avatar from '@material-ui/core/Avatar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';


const styles = theme => ({
    paper: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    toolbar: { justifyContent: "space-between" },
    scaleMinus: {
        transform: "scaleX(-1)"
    },
    "@keyframes spin": {
        from: { transform: "rotate(359deg)" },
        to: { transform: "rotate(0deg)" }
    },
    spin: { animation: "$spin 2s infinite linear" },
    listItemSecondaryAction: { paddingRight: theme.spacing(1) },
    square: {
        backgroundColor: theme.palette.triad.yellow,
        boxShadow: 'theme.palette.triad.yellow 0px 1px 4px, theme.palette.triad.yellow  0px 3px 12px 2px',
    }
});

function Badges(props) {
    const { classes, toggleAccountActivation, isAccountActivated } = props;
    return (
        <Paper className={classes.paper}>
            <Toolbar className={classes.toolbar}>
                <Box display="flex" alignItems="center">
                    <Box mr={2} >
                        <ListItemText
                            primary="My Badges"
                            className="mr-2"
                        />
                    </Box>
                    <Box mr={2} boxShadow={3}>
                        <Avatar variant="rounded" className={classes.square}>
                            <Filter1Icon />
                        </Avatar>
                    </Box>
                    <Box mr={2} boxShadow={3}>

                        <Tooltip title="alcapaha">
                            <Avatar className={classes.square}>
                                <AccountBalanceWalletIcon />
                            </Avatar>
                        </Tooltip>
                    </Box>
                </Box>
                <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                    <Switch
                        color="secondary"
                        checked={isAccountActivated}
                        onClick={toggleAccountActivation}
                        inputProps={{
                            "aria-label": isAccountActivated
                                ? "Deactivate Account"
                                : "Activate Account"
                        }}
                    />
                </ListItemSecondaryAction>
            </Toolbar>
        </Paper>
    );
}



export default withStyles(styles, { withTheme: true })(Badges);
