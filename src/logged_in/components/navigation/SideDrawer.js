import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isSidedrawerOpen } from '../../../shared/redux/actions/ui.actions.js'

const drawerWidth = 340;

const styles = {
  toolbar: {
    minWidth: drawerWidth
  }
};

function SideDrawer(props) {
  const { classes } = props;
  const sidedrawer = useSelector(state => state.ui.sidedrawer)
  const dispatch = useDispatch();

  const onClose = (val) => {
    dispatch(isSidedrawerOpen(val))
  }

  return (
    <Drawer anchor="right" open={sidedrawer} variant="temporary" onClose={() => onClose(false)}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">A Sidedrawer</Typography>
          <IconButton
            onClick={() => onClose(false)}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(SideDrawer);
