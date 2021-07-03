import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import { Dialog, Input, InputAdornment, IconButton, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';

const NameField = (props) => {
    const { headersIni } = props;
    const [headers, setHeaders] = useState(props.headersIni);

    // useEffect(() => {
    //     setHeaders(props.headersIni)
    // }, [props.headersIni])

    const handleChange = (field, value) => {
        console.log("field value", field,value)
        setHeaders(prev => {
            const temp =  prev.map(p => {
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



