import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { InDevelopment } from "../../../shared/components/InDevelopment";

const styles = {
  toolbar: {
    justifyContent: "space-between",
  },
};

function SubscriptionInfo(props) {
  const { classes, openAddBalanceDialog } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <InDevelopment />
      <ListItemText primary="Status" secondary="Premium Account" />
      <Button
        variant="contained"
        color="secondary"
        onClick={openAddBalanceDialog}
        disableElevation
      >
        Add Operation
      </Button>
    </Toolbar>
  );
}

SubscriptionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(SubscriptionInfo);
