import _ from 'lodash';
import { Paper, Button } from '@material-ui/core';
import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import CardWrapper from '../Card'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { DataGrid } from '@material-ui/data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@material-ui/x-grid-data-generator';

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
    }
}));

const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age',width: 120, type: 'number', editable: true },
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

const rows = [
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
    const classes = useStyles();

    const addLinesMenu = {
        action: () => addLine(),
        icon: PlaylistAddIcon
    }

    const addLine = () => {
        
    }

    return (
        <CardWrapper extraMenu={addLinesMenu} {...props} openSettings={() => toggleConfig(!config)}>
            <div className={classes.table}>
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
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