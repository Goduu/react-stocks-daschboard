import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@mui/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';


const useStyles = makeStyles({
  root: {
    zIndex: 4
  },

});

export default function StockInfos(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-title">{props.data.longName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Exchange: {props.data.fullExchangeName} <br />
            Sector: {props.data.sector}<br />
            Industry: {props.data.industry}<br />
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {props.data.longBusinessSummary}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={props.onClose} color="primary" autoFocus>
            Close
          </Button>
          <Link href={props.data.website} target="_blank" color="inherit">
            <Button onClick={props.onClose} color="primary" autoFocus>
              Visit Website
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}