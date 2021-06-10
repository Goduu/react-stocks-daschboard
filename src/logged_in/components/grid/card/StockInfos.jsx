import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';


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
            Exchange: {props.data.fullExchangeName} <br/>
            Sector: {props.data.sector}<br/>
            Industry: {props.data.industry}<br/>
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