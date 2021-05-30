import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { useDemoData } from '@material-ui/x-grid-data-generator';

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

export default function ToolbarGrid() {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 3,
        maxColumns: 4,
    });

    const addRow = () => {
        //   rowsTemp = [...state.rows]
        //         rowsTemp
        //         .push({
        //             id: state.rowNumber + 1,
        //             h1: '',
        //             h2: '',
        //             h3: ''
        //         });
    }

    const AddRowFooter = (props) => {
        const classes = useStyles();

        return (
            <div className={classes.root} >
                <AddCircleOutlineIcon fontSize="small" onClick={addRow} />
          Add Row
            </div>
        );
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                {...data}
                components={{
                    Toolbar: GridToolbar,
                    Footer: AddRowFooter
                }}
            />
        </div>
    );
}



export function TableGrid(props) {
    return ({
        type: 'table',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props} className="MuiPaper-elevation1">
                <span className="grid-menu">
                    <span onClick={props.onRemoveItem}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <ToolbarGrid />
            </div>)
    }
    );
}
