import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PowerInputIcon from '@mui/icons-material/PowerInput';
import { Dialog, Input, InputAdornment, IconButton, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { withStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import _ from 'lodash'
import TextField from '@mui/material/TextField';

const NameField = (props) => {
    const { headersIni } = props;
    const [headers, setHeaders] = useState(props.headersIni);

    // useEffect(() => {
    //     setHeaders(props.headersIni)
    // }, [props.headersIni])

    const handleChange = (field, value) => {
        setHeaders(prev => {
            const temp = prev.map(p => {
                p.field = p.field === field ? _.camelCase(value) : p.field
                p.headerName = p.field === field ? value : p.headerName
                return p
            })
            return temp
        })
    }

    return headers ? headers.map(h => {

        return <Input
            key={h.field}
            id="standard-adornment-password"
            type='text'
            value={h.headerName}
            onChange={(e) => handleChange(h.field, e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    }) : null

}
//-------------------------------
//-------Table Settings--------------
//-------------------------------
export const TableSetting = (props) => {
    const [open, setOpen] = useState(props.open || false);
    const [headers, setHeaders] = useState(props.headers);
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setHeaders(props.headers)
    }, [props.headers])

    useEffect(() => {
        setOpen(!open)
    }, [props.open])

    const handleChange = (field, value) => {
        // console.log("field vlaue", field, value, headers)
        // setHeaders(prev => {
        //     return prev.map(p => {
        //         p.field = p.field === field ? _.camelCase(value) : p.field
        //         p.headerName = p.field === field ? value : p.headerName
        //         return p
        //     })
        // })
    }


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Headers</DialogTitle>
            <DialogContent className="grid-wrapper" >

                <NameField headersIni={headers} handleChange={(e) => handleChange('h.field', e)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>

            </DialogActions>
        </Dialog>
    );
}



