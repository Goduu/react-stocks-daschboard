import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { TextField, InputAdornment, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';

const BUY = 1; const SELL = 2; const DIVIDEND = 3;
// const useStyles = makeStyles((theme) => ({
//   dialog: {
//     width: '100',
//   },
// }))

const validationError_ = {
  asset: { status: false, msg: '' },
  value: { status: false, msg: '' },
  shares: { status: false, msg: '' },
  date: { status: false, msg: '' },
}

export default function AddOperadionDialog(props) {
  const [open, setOpen] = React.useState(props.open);
  const [operation, setOperation] = React.useState(BUY);
  const [asset, setAsset] = React.useState();
  const [exchange, setExchange] = React.useState();
  const [value, setValue] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [date, setDate] = React.useState((new Date()).toLocaleDateString());
  const [id, setId] = React.useState();
  const [validationError, setValidationError] = React.useState(validationError_);
  const closeDialog = props.closeDialog
  // const classes = useStyles();

  const validadeOperation = () => {
    let validation = validationError_
    let flag = true
    if (asset === '' || asset === undefined) {
      validation.asset.status = true
      validation.asset.msg = 'Choose your asset'
      flag = false
    }
    if (value === 0 && operation === DIVIDEND) {
      validation.value.status = true
      validation.value.msg = 'Dividend can not be 0'
      flag = false
    }
    if (shares <= 0 && operation !== DIVIDEND) {
      validation.shares.status = true
      validation.value.msg = 'Shares can not be equal or less than 0'
      flag = false
    }
    setValidationError(prev => {
      return { ...prev, ...validation }
    })
    return flag
  }
  const handleSave = () => {
    let op = {
      id: id,
      asset: asset,
      value: value,
      shares: operation === SELL ? -shares : shares,
      date: new Date(date).getTime(),
      operation: operation }

    if (validadeOperation()) {
      if (id) {
        props.editOperation(op)
      } else {
        props.saveOperation(op)
      }
    }

  }

  useEffect(() => {
    setId(props.transaction.id)
    setOperation(props.transaction.operation)
    setAsset(props.transaction.asset)
    setExchange(props.transaction.exchange)
    setValue(props.transaction.value)
    setShares(Math.abs(props.transaction.shares))
    const date = new Date(props.transaction.date)
    setDate(date.getFullYear() +
      '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) +
      '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()))
  }, [props.transaction])

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  return (
    <div>
      <Dialog open={open} onClose={closeDialog} maxWidth={'sm'}>
        <DialogTitle id="form-dialog-title">Operate</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid>

              <Button
                variant={operation === BUY ? 'contained' : "outlined"}
                color="primary"
                onClick={() => setOperation(BUY)}>
                Buy
            </Button>
            </Grid>
            <Grid>
              <Button
                variant={operation === SELL ? 'contained' : "outlined"}
                color="primary"
                onClick={() => setOperation(SELL)}>
                Sell
            </Button>
            </Grid>
            <Grid>
              <Button variant={operation === DIVIDEND ? 'contained' : "outlined"}
                color="primary"
                onClick={() => setOperation(DIVIDEND)}>
                Dividend
            </Button>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={8}>
              <TextField
                required
                autoFocus
                onChange={(e) => setAsset(e.target.value)}
                value={asset}
                id="name"
                label="Asset"
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                error={validationError.asset.status}
                helperText={validationError.asset.msg}
              />
            </Grid>
            <Grid item xs={4}>

              <TextField
                required
                onChange={(e) => setExchange(e.target.value)}
                // error={amountError ? true : false}
                // helperText={amountError}
                value={exchange}
                variant="outlined"
                fullWidth
                type="number"
                margin="none"
                label="Exchange"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                disabled={operation === DIVIDEND}
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                // error={amountError ? true : false}
                // helperText={amountError}
                variant="outlined"
                fullWidth
                type="number"
                margin="none"
                label="Shares"
                helperText={validationError.shares.msg}
                error={validationError.shares.status}

              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                // error={amountError ? true : false}
                // helperText={amountError}
                variant="outlined"
                fullWidth
                type="number"
                margin="none"
                label={operation === DIVIDEND ? "Amount" : "Price per share"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                helperText={validationError.value.msg}
                error={validationError.value.status}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                // error={amountError ? true : false}
                // helperText={amountError}
                variant="outlined"
                fullWidth
                type="date"
                margin="none"
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={validationError.date.msg}
                error={validationError.date.status}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
