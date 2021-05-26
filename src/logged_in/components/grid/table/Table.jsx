import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PowerInputIcon from '@material-ui/icons/PowerInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
// import { changeHeader,changeHeaderType,changeHeaderName,
//          addRow,changeRow, selectHeader,selectRows } from './tableSlice';
import {changeHeader,changeHeaderType,changeHeaderName,
    addRow,changeRow} from '../../../../shared/redux/actions/table.actions.js'

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
        display: 'flex',
    },
    connected: {
        marginRight: 2,
    },
    disconnected: {
        marginRight: 2,
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 3,
    },
    selectType: {
        marginLeft: '0.5em'
    },
}));


let columns = [
    { field: 'h1', headerName: 'headStr', flex: 1, type: 'string', editable: true },
    { field: 'h2', headerName: 'headNum', flex: 1, type: 'number', editable: true },
    {
        field: 'h3',
        headerName: 'headDate',
        type: 'date',
        width: 180,
        editable: true,
    },
];



export function EnhancedTable() {
    // const [rows, setRows] = React.useState(defaultRows);
    const [lineNumber, setLineNumber] = React.useState(1);
    const header = useSelector(state => state.table.headers);
    const rows = useSelector(state => state.table.rows);
    const dispatch = useDispatch();

    const CustomFooterStatusComponent = (props) => {
        const classes = useStyles();

        return (
            <div className={classes.root}>
                <AddCircleOutlineIcon fontSize="small" onClick={addLine} />
              Add Row
            </div>
        );
    }
    const addLine = () => {
        console.log("linen", lineNumber)
        dispatch(addRow());

        setLineNumber(lineNumber + 1)

    }
    const saveRow = (e) => {
        console.log("linen", e)
        dispatch(changeRow({...e}));

        setLineNumber(lineNumber + 1)

    }

        return (
            <DataGrid rows={rows} columns={header}
                components={{
                    Footer: CustomFooterStatusComponent,
                }}
                onEditCellChangeCommitted={saveRow}
            />
        );

    
}

//-------------------------------
//-------Table Menu--------------
//-------------------------------
const TableSettingMenus = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [_columns] = React.useState(columns);
    const dispatch = useDispatch();
    // const header = useSelector(state => state.table.headers);
    const [header,setHeader] = React.useState(props.params.header);
    const [headerControl, setHeaderControl] = React.useState(header);

    const handleChangeType = (event, col) => {
        let field = col.field
        dispatch(changeHeaderType({field: field, type: event.target.value}))
        
    };
    const handleChangeName = (event, c) => {
        console.log("c",c,event)
        let field = c.field
        dispatch(changeHeaderName({field: field, type: event.target.value}))
        
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        columns = _columns
        setAnchorEl(null);
    };

    const handleMenuClick = (item) => {
        handleClickOpenDialog()
    }


    const handleClickOpenDialog = () => {
        console.log("Open Dialog")
        setHeaderControl(header)
        setOpenDialog(true);
    };

    const handleCloseDialog = (e) => {
        console.log("CLOSE", e)
        setOpenDialog(false);
    };
    
    const handleCancelDialog = (e) => {
        console.log("handleCancelDialog", e)
        dispatch(changeHeader(headerControl))
        setOpenDialog(false);
    };

    return (
        <span>
            <SettingsIcon fontSize="small" onClick={handleClick} />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleMenuClick}>
                    <ListItemIcon >
                        <PowerInputIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit Header" />
                </StyledMenuItem>
            </StyledMenu>

            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Headers</DialogTitle>
                <DialogContent className="grid-wrapper" >

                    <form>
                        {header.map(col => {
                            return (
                                <div>
                                    <TextField 
                                        id={col.headerName}
                                        value={col.headerName}
                                        className={classes.input}
                                        onChange={(e) => handleChangeName(e,col)}
                                        key={'1ad4'+col.headerName}
                                    />
                                    <Select
                                        value={col.type}
                                        onChange={(e) => handleChangeType(e, col)}
                                        className={classes.selectType}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        key='xongas'
                                    >
                                        <MenuItem key={'v-str'+col.headerName} value={'string'}>Text</MenuItem>
                                        <MenuItem key={'v-dat'+col.headerName} value={'date'}>Date</MenuItem>
                                        <MenuItem key={'v-num'+col.headerName} value={'number'}>Number</MenuItem>
                                    </Select>
                                </div>
                            )
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Save
                    </Button>

                </DialogActions>
            </Dialog>
        </span>
    );
}

//---What returns to create the table grid box 
export function TableGrid(props) {
    return ({
        type: 'table',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props} className="MuiPaper-elevation1">
                <span className="grid-menu">
                    <span >
                        <TableSettingMenus {...props} />
                    </span>
                    <span onClick={props.onRemoveItem}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <EnhancedTable />
            </div>)
    }
    );
}

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


