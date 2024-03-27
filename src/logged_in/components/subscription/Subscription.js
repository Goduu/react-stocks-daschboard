import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@mui/material";
import { withStyles } from "@mui/styles";
import SubscriptionTable from "./SubscriptionTable2";
import PortifolioChart from "./PortifolioChart";
import SubscriptionInfo from "./SubscriptionInfo";
import AddOperadionDialog from "./AddOperationDialog";
import { registerOperation } from "../../../shared/functions/requests";
import {
  getAllOperations,
  deleteOperation,
  editOperation,
} from "../../../shared/functions/requests";
import { useSnackbar } from "@mui/base";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
};

function Subscription(props) {
  const { classes, selectSubscription } = props;
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const [operationOpen, setOperationOpen] = useState(false);
  useEffect(selectSubscription, [selectSubscription]);

  const openOperationDialog = () => {
    setOperationOpen(true);
  };
  const openEditTransaction = (transaction) => {
    if (transaction) {
      setEditTransaction(transaction);
      setOperationOpen(true);
    }
  };
  const saveOperation = (form) => {
    registerOperation({ ...form, userId: userId }, token)
      .then(() => {
        refreshOperations();
        setOperationOpen(false);
      })
      .catch((e) => {
        if (e.response.status === 428) {
          enqueueSnackbar("Not enought Balance to operate", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      });
  };
  const editOperation_ = (form) => {
    editOperation({ ...form, userId: userId }, token).then(() => {
      refreshOperations();
    });
    setOperationOpen(false);
  };

  const refreshOperations = useCallback(() => {
    getAllOperations(userId, token).then((transactions) => {
      setTransactions(transactions);
    });
  }, [userId, token]);

  useEffect(() => {
    refreshOperations();
  }, [refreshOperations]);

  const handleDeleteOperation = (id) => {
    deleteOperation(id, token)
      .then(() => {
        enqueueSnackbar("Operation Deleted", { variant: "success" });
        refreshOperations();
      })
      .catch((e) => {
        enqueueSnackbar("Error - " + e, { variant: "error" });
      });
  };

  return (
    <Paper>
      <AddOperadionDialog
        open={operationOpen}
        closeDialog={() => setOperationOpen(false)}
        saveOperation={saveOperation}
        editOperation={editOperation_}
        transaction={editTransaction}
      />
      <List disablePadding>
        <SubscriptionInfo openAddBalanceDialog={openOperationDialog} />
        <Divider className={classes.divider} />
        <SubscriptionTable
          transactions={transactions}
          delete={handleDeleteOperation}
          edit={openEditTransaction}
        />
      </List>
      <PortifolioChart />
    </Paper>
  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Subscription);
