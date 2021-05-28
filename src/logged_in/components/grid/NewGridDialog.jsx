import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchCardInfo } from '../../../shared/redux/actions/grid.actions'
// import { fetchCardInfo } from '../../../shared/functions/requests.js';

export default function NewGridDialog({ chooseIdentifier}) {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()
    const [ticker, setTicker] = useState('')
    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    const handleCancel = () => {
        // setOpen(false);
    };

    const handleSave = () => {
        console.log("Choose ticker", ticker)
        chooseIdentifier(ticker)
        // dispatch(fetchCardInfo(ticker))
        // setOpen(false);
        
    };

    return (
        <div>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose your stock!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Firtly, choose your stock ticker to continue.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Stock Ticker"
                        type="text"
                        fullWidth
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
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
