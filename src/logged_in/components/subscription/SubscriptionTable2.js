// import React, { useCallback, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TablePagination,
//   TableRow,
//   withStyles
// } from "@material-ui/core";
// import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
// import ColorfulChip from "../../../shared/components/ColorfulChip";
// import unixToDateString from "../../../shared/functions/unixToDateString";
// import HighlightedInformation from "../../../shared/components/HighlightedInformation";
// import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
// import { getAllOperations } from '../../../shared/functions/requests'
// import { useSelector } from "react-redux";
// import { useTranslation } from 'react-i18next';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import IconButton from '@material-ui/core/IconButton';
// import { DataGrid } from '@material-ui/data-grid';

// const BUY = 1; const SELL = 2; const DIVIDEND = 3;

// const styles = theme => ({
//   tableWrapper: {
//     overflowX: "auto",
//     width: "100%"
//   },
//   blackBackground: {
//     backgroundColor: theme.palette.primary.main
//   },
//   contentWrapper: {
//     padding: theme.spacing(3),
//     [theme.breakpoints.down("xs")]: {
//       padding: theme.spacing(2)
//     },
//     width: "100%"
//   },
//   dBlock: {
//     display: "block !important"
//   },
//   dNone: {
//     display: "none !important"
//   },
//   firstData: {
//     paddingLeft: theme.spacing(3)
//   }
// });


// const rowsPerPage = 25;

// function SubscriptionTable(props) {
//   const { theme, classes } = props;
//   const [page, setPage] = useState(0);
//   const [transactions, setTransactions] = useState(props.transactions);
//   const userId = useSelector(state => state.auth.id)
//   const token = useSelector(state => state.auth.token)
//   const { t } = useTranslation();


// const columns = [
//   {
//     field: "asset",
//     headerName: "Asset"
//   },
//   // {
//   //   field: "operation",
//   //   type: 'number',
//   //   headerName: "Operation"
//   // },
//   // {
//   //   field: "value",
//   //   type: 'number',
//   //   headerName: "Price"
//   // },
//   // {
//   //   field: "shares",
//   //   type: 'number',
//   //   headerName: "Shares"
//   // },
//   // {
//   //   field: "total",
//   //   type: 'number',
//   //   headerName: "Total",
//   //   valueGetter: (params) =>
//   //     `${params.getValue(params.id, 'shares') || 1} ${params.getValue(params.id, 'number') || 0
//   //     }`,
//   // },
//   {
//     field: "date",
//     headerName: "Date",
//     renderCell: (params) => (
//       <>
//         {t('date', { date: new Date(params.value.date) })}
//       </>
//     )
//   },
//   {
//     field: "actions",
//     type: 'object',
//     headerName: "Actions"
//   },
// ];

//   const handleChangePage = useCallback(
//     (_, page) => {
//       setPage(page);
//     },
//     [setPage]
//   );

//   useEffect(() => {
//     setTransactions(props.transactions)
//   }, [props.transactions])

//   const refreshOperations = useCallback(() => {
//     getAllOperations(userId, token)
//       .then(transactions => {
//         console.log("transactions", transactions)
//         setTransactions(transactions)

//       })
//   }, [userId, token])

//   useEffect(() => {
//     refreshOperations()
//   }, [])

//   const getOperationLabel = (op) => {
//     let res = op === DIVIDEND ? 'Dividend' : op === BUY ? 'Buy' : 'Sell'
//     return res
//   }
//   let row = [{
//       asset: "GOOGL",
//       id: 1,

//   },]

//   const operations = ['Buy', 'Sell', 'Dividend']

//   if (transactions.length > 0) {
//     return (
//       <div className={classes.tableWrapper}>
//         <div style={{ height: 400, width: '100%' }}>
//           <DataGrid rows={row} columns={columns} pageSize={5} />
//         </div>
//         <button onClick={() => { console.log("asd", transactions) }}>adsa</button>
//       </div>
//     );
//   }
//   return (
//     <div className={classes.contentWrapper}>
//       <HighlightedInformation>
//         No transactions received yet.
//       </HighlightedInformation>
//     </div>
//   );
// }

// SubscriptionTable.propTypes = {
//   theme: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired,
//   transactions: PropTypes.arrayOf(PropTypes.object).isRequired
// };

// export default withStyles(styles, { withTheme: true })(SubscriptionTable);


import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from "react-redux";
import { useTheme } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import { getAllOperations, getStocksPrices } from '../../../shared/functions/requests'
import ColorfulChip from "../../../shared/components/ColorfulChip";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash'
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

const getOperationLabel = (op) => {
  let res = op === DIVIDEND ? 'Dividend' : op === BUY ? 'Buy' : 'Sell'
  return res
}


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function SubscriptionTable(props) {
  const [transactions, setTransactions] = useState(props.transactions);
  const [currentPrices, setCurrentPrices] = useState([]);
  const userId = useSelector(state => state.auth.id)
  const token = useSelector(state => state.auth.token)
  const { t } = useTranslation();
  const theme = useTheme();


  const columns = [
    {
      field: "asset",
      width: 150,
      headerName: "Asset"
    },
    {
      field: "operation",
      width: 150,
      headerName: "Operation",
      valueGetter: (params) => {
        return getOperationLabel(params.value)
      }
    },
    {
      field: "value",
      type: 'number',
      width: 130,
      headerName: "Price",
      valueGetter: (params) => {
        return `$${params.value}`
      }
    },
    {
      field: "shares",
      type: 'number',
      width: 130,
      headerName: "Shares",
      valueGetter: (params) => {
        return params.row.operation !== DIVIDEND ? params.value : '-'
      }
    },
    {
      field: "total",
      width: 130,
      headerName: "Total",
      renderCell: (params) => {
        return params.row.operation == BUY ? (
          <ColorfulChip
            label={`-${currencyPrettyPrint(
              params.row.value * params.row.shares
            )}`}
            color={theme.palette.error.dark}

          />
        ) : params.row.operation == SELL ? (
          <ColorfulChip
            label={`+${currencyPrettyPrint(params.row.value * params.row.shares)}`}
            color={theme.palette.success.dark}
          />
        ) : (
          <ColorfulChip
            label={`+${currencyPrettyPrint(params.row.value)}`}
            color={theme.palette.info.dark}
          />
        )

      }
    },
    {
      field: "result",
      width: 130,
      headerName: "Result",
      renderCell: (params) => {
        let res = 100* (currentPrices[params.row.asset] - params.row.value ) / (params.row.value * params.row.shares)
        res = res.toFixed(2)
        return params.row.operation == BUY ? (
          res > 0 ? (
            <ColorfulChip
              label={`+${res} %`}
              color={theme.palette.success.dark}
            />) :
            (
              <ColorfulChip
                label={`${res} %`}

                color={theme.palette.error.dark}
              />)
        ) : (
          ''
        )

      }
    },
    {
      field: "date",
      width: 150,
      headerName: "Date",
      renderCell: (params) => (
        <>
          {t('date', { date: new Date(params.value) })}
        </>
      )
    },
    {
      field: "actions",
      type: 'object',
      width: 150,
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" size='small' onClick={() => props.edit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" size='small' onClick={() => props.delete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
  ];

  useEffect(() => {
    setTransactions(props.transactions)
    let tickers = _.uniqBy(props.transactions, 'asset').map(t => t.asset);
    if (tickers.length > 0) {
      getStocksPrices(tickers, token)
        .then(res => {
          setCurrentPrices(res)
        })

    }
    console.log("UNIQUES", tickers)
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={transactions} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
}
