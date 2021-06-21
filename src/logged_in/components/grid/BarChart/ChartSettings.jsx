import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Dialog, ButtonGroup, Button, Switch, DialogTitle, ListItemText, ListItemIcon, DialogActions,
    ListItem, List, Radio, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core/';
import { blue } from '@material-ui/core/colors';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));



const useStyles_ = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

const LINE = 'line'
const BAR = 'bar'
const L = 'left'
const R = 'right'

export default function ChartSettings(props) {
    const classes = useStyles_();
    const { onClose, selectedValue, saveSettings } = props;
    // const [open, setOpen] = useState(props.open);
    const [priceType, setPriceType] = useState(BAR);
    const [priceActive, setPriceActive] = useState(false);
    const [pricePos, setPricePos] = useState(L);
    const [dividendType, setDividendType] = useState(BAR);
    const [dividendPos, setDividendPos] = useState(R);
    const [dividendActive, setDividendActive] = useState(false);
    const [open, setOpen] = React.useState(props.open);

    useEffect(() => {
        setOpen(!open)
    }, [props.open])

    const handleSave = (value) => {
        const settings = []
        charts.forEach(c => {
            if(c.active){
                settings.push({name: c.name, type: c.type, pos: c.pos})
            }
        })
        saveSettings(settings);
        setOpen(false);
        // setSelectedValue(value);
    };

    const handleToggle = (value) => {
    };

    const charts = [
        {
            label: 'Price',
            name: 'price',
            type: priceType,
            active: priceActive,
            pos: pricePos,
            setPos: setPricePos,
            setter: setPriceType,
            activate: setPriceActive,
        },
        {
            label: 'Dividend',
            name: 'dividend',
            type: dividendType,
            active: dividendActive,
            pos: dividendPos,
            setPos: setDividendPos,
            setter: setDividendType,
            activate: setDividendActive
        },

    ]

    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle id="simple-dialog-title">Charts Options</DialogTitle>
            <TableContainer component={Paper} className={classes.paper}>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Active</TableCell>
                            <TableCell align="center">Chart</TableCell>
                            <TableCell align="center">Bar</TableCell>
                            <TableCell align="center">Line</TableCell>
                            <TableCell align="center">Y-Axis Pos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {charts.map((value) => {
                            const labelId = `transfer-list-item-${value}-label`;

                            return (
                                <TableRow key={"settingsChart"+value.name} role="listitem" >
                                    <TableCell >
                                        <Switch size="small" checked={value.active} onChange={() => value.activate(!value.active)} />
                                    </TableCell>

                                    <TableCell >
                                        <ListItemText id={labelId} primary={`${value.label}`} />
                                    </TableCell>
                                    <TableCell>
                                        <Radio
                                            checked={value.type === BAR}
                                            onChange={() => value.setter(BAR)}
                                            value={BAR}
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                    </TableCell>
                                    <TableCell>

                                        <Radio
                                            checked={value.type === LINE}
                                            onChange={() => value.setter(LINE)}
                                            value={LINE}
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup size="small" >
                                            <Button
                                                variant={value.pos === L && 'contained'}
                                                onClick={() => value.setPos(L)}>
                                                Left
                                            </Button>
                                            <Button
                                                variant={value.pos === R && 'contained'}
                                                onClick={() => value.setPos(R)}>
                                                Right
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow >
                            );
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogActions>
                <Button autoFocus onClick={handleSave} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog >
    );
}

