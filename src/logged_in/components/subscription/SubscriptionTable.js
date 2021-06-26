import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles
} from "@material-ui/core";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import ColorfulChip from "../../../shared/components/ColorfulChip";
import unixToDateString from "../../../shared/functions/unixToDateString";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
import { getAllOperations } from '../../../shared/functions/requests'
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const BUY = 1; const SELL = 2; const DIVIDEND = 3;

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "asset",
    numeric: false,
    label: "Asset"
  },
  {
    id: "operation",
    numeric: false,
    label: "Operation"
  },
  {
    id: "price",
    numeric: false,
    label: "Price"
  },
  {
    id: "shares",
    numeric: false,
    label: "Shares"
  },
  {
    id: "total",
    numeric: false,
    label: "Total"
  },
  {
    id: "date",
    numeric: false,
    label: "Date"
  },
  {
    id: "actions",
    numeric: false,
    label: "Actions"
  },
];

const rowsPerPage = 25;

function SubscriptionTable(props) {
  const { theme, classes } = props;
  const [page, setPage] = useState(0);
  const [transactions, setTransactions] = useState(props.transactions);
  const userId = useSelector(state => state.auth.id)
  const token = useSelector(state => state.auth.token)
  const { t } = useTranslation();

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  useEffect(() => {
    setTransactions(props.transactions)
  }, [props.transactions])

  const refreshOperations = useCallback(() => {
    getAllOperations(userId, token)
      .then(transactions => {
        setTransactions(transactions)

      })
  }, [userId, token])

  useEffect(() => {
    refreshOperations()
  }, [])

  const getOperationLabel = (op) => {
    let res = op === DIVIDEND ?  'Dividend' : op === BUY ? 'Buy' : 'Sell'
    return res
  }

  const operations = ['Buy', 'Sell', 'Dividend']

  if (transactions.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={transactions.length} rows={rows} />
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {transaction.asset}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {getOperationLabel(transaction.operation)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {`$${transaction.value}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {transaction.operation !== DIVIDEND ? transaction.shares : '-'}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.operation == BUY ? (
                      <ColorfulChip
                        label={`-${currencyPrettyPrint(
                          transaction.value * transaction.shares
                        )}`}
                        color={theme.palette.error.dark}
                      />
                    ) : transaction.operation == SELL ? (
                      <ColorfulChip
                        label={`+${currencyPrettyPrint(transaction.value * transaction.shares)}`}
                        color={theme.palette.success.dark}
                      />
                    ) : (
                      <ColorfulChip
                        label={`+${currencyPrettyPrint(transaction.value)}`}
                        color={theme.palette.info.dark}
                      />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {t('date', { date: new Date(transaction.date) })}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton aria-label="delete" size='small' onClick={() =>props.edit(transaction)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size='small' onClick={() =>props.delete(transaction.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: transactions.length > 0 ? classes.dBlock : classes.dNone,
            caption: transactions.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No transactions received yet.
      </HighlightedInformation>
    </div>
  );
}

SubscriptionTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(SubscriptionTable);
