import _ from 'lodash';
import { Paper, Button, IconButton, Fade } from '@material-ui/core';
import { useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardWrapper from '../Card'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { DataGrid } from '@material-ui/data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@material-ui/x-grid-data-generator';
import DeleteIcon from '@material-ui/icons/Delete';
import {TableSetting} from './TableSettings'

const gridStyle = { height: '100%' }

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%'
    },
    table: {
        paddingTop: '30px',
        height: '95%',
        margin: '8px',
        overflow: 'hidden',
    },
    tableFooter: {
        padding: theme.spacing(1),
    }
}));

const columnsIni = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', width: 120, type: 'number', editable: true },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'date',
        width: 180,
        editable: true,
    },
    {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'dateTime',
        width: 220,
        editable: true,
    },
];

const rowsIni = [
    {
        id: 1,
        name: randomTraderName(),
        age: 25,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 2,
        name: randomTraderName(),
        age: 36,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
]

const Table = (props) => {
    const [config, toggleConfig] = useState(false);
    const [rows, setRows] = useState(rowsIni);
    const [columns, setColumns] = useState(columnsIni);
    const [rowsSelected, setRowsSelected] = useState([]);
    const classes = useStyles();

    const addLinesMenu = {
        action: () => addLine(),
        icon: PlaylistAddIcon
    }

    const addLine = () => {
        setRows(prev => {
            let copy = [...prev]
            copy.push(
                {
                    id: prev.length + 1,
                    name: '',
                    age: 0,
                    dateCreated: '',
                    lastLogin: randomUpdatedDate(),
                },
            )
            return copy
        })
    }
    const deleteRows = () => {
        console.log("reows", rows, rowsSelected)
        setRows(prev => {
            return prev.filter(p => {
                console.log("prev.indexOf(p) + 1", prev.indexOf(p) + 1)
                console.log("!rowsSelected.includes(prev.indexOf(p) + 1)", !rowsSelected.includes(prev.indexOf(p) + 1))

                return !rowsSelected.includes(prev.indexOf(p) + 1)
            })
        })
    }


    function Footer(props) {
        const classes = useStyles();
        const theme = useTheme();
        const [menuActive, isMenuActive] = useState(false);
        const [settingsOpen, setSettingsOpen] = useState(false);

        return (
            <div className={classes.tableFooter} onMouseEnter={() => isMenuActive(true)} onMouseLeave={() => isMenuActive(false)}>
                <Fade in={menuActive} timeout={600}>
                    <IconButton size="small" onClick={deleteRows}
                        style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                        <DeleteIcon size="small" />
                    </IconButton>
                </Fade>
                <Fade in={menuActive} timeout={600}>
                    <IconButton size="small" onClick={addLine}
                        style={menuActive ? { color: theme.palette.text.primary } : { color: theme.palette.background.paper }} >
                        <PlaylistAddIcon size="small" />
                    </IconButton>
                </Fade>
            </div>
        );
    }

    const test = (as) => {
        console.log("teeeesst", as)
    }



    return (
        <CardWrapper extraMenu={addLinesMenu} {...props} openSettings={() => toggleConfig(!config)}>
            <TableSetting open={config} headers={columns}/>
            <div className={classes.table}>
                <div style={{ height: '100%', width: '100%' }}>
                    {(rows && columns) &&
                        <DataGrid
                            onColumnHeaderClick={e => test(e)}
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableColumnMenu
                            onSelectionModelChange={(newSelection) => {
                                console.log("alcapaha", rowsSelected)
                                setRowsSelected(newSelection.selectionModel);
                            }}
                            selectionModel={rowsSelected}
                            components={{
                                Footer: Footer,
                            }} />
                    }
                </div>
            </div>
        </CardWrapper>

    )
}

export function TableGrid(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>
                <Table key={props.i} {...props} />
            </Paper>
        )
    })

}