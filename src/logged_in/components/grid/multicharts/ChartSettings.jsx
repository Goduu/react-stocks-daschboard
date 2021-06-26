import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Dialog, ButtonGroup, Button, Switch, DialogTitle, ListItemText, Checkbox, DialogActions,
    ListItem, List, Radio, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    InputLabel, Select, Tooltip, InputAdornment, MenuItem
} from '@material-ui/core/';
import { blue } from '@material-ui/core/colors';
import { useEffect } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { color } from '@material-ui/system';

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

export default function StatisticsSettings(props) {
    const classes = useStyles_();
    const theme = useTheme();
    const colors = [
        { name: 'Primary', color: theme.palette.primary.main },
        { name: 'Secondary', color: theme.palette.secondary.main },
        { name: 'Gray', color: theme.palette.grey[500] }
    ]

    const { onClose, selectedValue, saveSettings } = props;
    // const [open, setOpen] = useState(props.open);
    const [priceType, setPriceType] = useState(BAR);
    const [priceActive, setPriceActive] = useState(false);
    const [pricePos, setPricePos] = useState(L);
    const [priceColor, setPriceColor] = useState(colors[0].color);
    const [dividendType, setDividendType] = useState(BAR);
    const [dividendPos, setDividendPos] = useState(R);
    const [dividendActive, setDividendActive] = useState(false);
    const [dividendColor, setDividendColor] = useState(colors[1].color);
    const [financialType, setFinancialType] = useState(BAR);
    const [financialActive, setFinancialActive] = useState(false);
    const [financialPos, setFinancialPos] = useState(L);
    const [financialColor, setFinancialColor] = useState(colors[0].color);
    const [period, setPeriod] = useState(7);
    const [open, setOpen] = useState(props.open);

    

    useEffect(() => {
        setOpen(!open)
    }, [props.open])

    const handleSave = (value) => {
        const settings = []
        charts.forEach(c => {
            if (c.active) {
                settings.push({ name: c.name, type: c.type, pos: c.pos, color: c.color, period: period })
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
            color: priceColor,
            setPos: setPricePos,
            setter: setPriceType,
            activate: setPriceActive,
            setColor: setPriceColor,
        },
        {
            label: 'Dividend',
            name: 'dividend',
            type: dividendType,
            active: dividendActive,
            pos: dividendPos,
            color: dividendColor,
            setPos: setDividendPos,
            setter: setDividendType,
            activate: setDividendActive,
            setColor: setDividendColor,
        },
        {
            label: 'Financial',
            name: 'financial',
            type: financialType,
            active: financialActive,
            pos: financialPos,
            color: financialColor,
            setPos: setFinancialPos,
            setter: setFinancialType,
            activate: setFinancialActive,
            setColor: setFinancialColor,
        },

    ]

    return (
        <Dialog onClose={() => setOpen(false)} open={open} maxWidth="md">
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
                            <TableCell align="center">Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {charts.map((value) => {
                            const labelId = `transfer-list-item-${value}-label`;

                            return (
                                <TableRow key={"settingsChart" + value.name} role="listitem" >
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
                                    <TableCell >

                                        <Select

                                            value={value.color}
                                            onChange={e => value.setColor(e.target.value)}
                                            variant="standard"
                                            renderValue={(selected) => <StopRoundedIcon style={{ color: selected }}  />}
                                        >
                                            {colors.map((c) => {
                                                return <MenuItem value={c.color}>
                                                    <StopRoundedIcon style={{ color: c.color }}  />
                                                    {c.name}
                                                </MenuItem >
                                            })}


                                        </Select>
                                    </TableCell>
                                </TableRow >

                            );
                        }
                        )}
                        <TableRow>
                            <TableCell colSpan={2}>

                                <Select
                                    value={period}
                                    onChange={e => setPeriod(e.target.value)}
                                    label="Age"
                                    inputProps={{
                                        name: 'age',
                                    }}
                                    variant="standard"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Tooltip title="Data period">
                                                <DateRangeIcon />
                                            </Tooltip>
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value={7}>One Week</MenuItem>
                                    <MenuItem value={31}>One Month</MenuItem>
                                    <MenuItem value={180}>6 Months</MenuItem>
                                    <MenuItem value={365}>1 Year</MenuItem>
                                    <MenuItem value={1825}>5 Years</MenuItem>
                                    <MenuItem value={15000}>Max</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
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