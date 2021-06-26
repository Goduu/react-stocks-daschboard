import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getTickers, getTrendingTickers } from '../../../../shared/functions/requests.js';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    ResponsiveContainer,
    YAxis,
    XAxis
} from "recharts";

const getExchange = (land) => {
    const US = ['OOTC', 'XNYS', 'XNAS', 'ARCX', 'IEXG', 'XASE', 'BATS']
    const BR = ['BVMF']
    const FR = ['XPAR']
    const DE = ['XETR']
    switch (land) {
        case "BR": {
            return BR;
            break;
        }
        case "US": {
            return US;
            break;
        }
        case "FR": {
            return FR;
            break;
        }
        case "DE": {
            return DE;
            break;
        }
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '13em',
        height: '6.5em',
        cursor: 'pointer',
        margin: '5px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        whiteSpace: 'nowrap',
        fontSize: 14,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    pos: {
        marginBottom: 12,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    filter: {
        margin: '5px',
        marginBottom: '25px',
    },
    formControl: {
        marginLeft: '15px',
        minWidth: 150,
    },
    formItem: {
        display: 'flex',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    searchFilter: {
        marginTop: '5px'
    },
    trendingIcon: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.triad.red
    },
    trendingwrapper: {
        position: 'relative'
    }
}));


function TrendingCard(props) {
    const classes = useStyles();
    let el = props.ticker
    return (
        <div className={classes.trendingwrapper}>
            <Card className={classes.root} onClick={() => props.chooseIdentifier(el.ticker)} >
                <CardContent>
                    <Tooltip title={el.description} placement="top">
                        <Typography className={classes.title} color="textSecondary" gutterBottom label={el.description}>
                            {el.description}
                        </Typography>
                    </Tooltip>
                    <div style={{ width: '10em', height: '3em', display: 'flex' }}>
                        <Typography variant="h5" component="h2">
                            {el.ticker}
                        </Typography>
                        < ResponsiveContainer width="80%" height="80%">
                            <LineChart data={el.priceChart.values} type="number" >
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={1} dot={false} />
                                <XAxis dataKey="date" hide />
                                <YAxis domain={['dataMin', 'dataMax']} hide />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <div className={classes.trendingIcon}>
                    <Tooltip title="Trending">
                        <WhatshotIcon fontSize="small" />
                    </Tooltip>
                </div>
            </Card>
        </div>
    );
}
function TickerCard(props) {
    const classes = useStyles();
    let el = props.ticker
    return (
        <Card className={classes.root} onClick={() => props.chooseIdentifier(el.ticker)} >
            <CardContent>
                <Tooltip title={el.description} placement="top">
                    <Typography className={classes.title} color="textSecondary" gutterBottom label={el.description}>
                        {el.description}
                    </Typography>
                </Tooltip>

                <Typography variant="h5" component="h2">
                    {el.ticker}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default function NewDashboard(props) {
    const classes = useStyles();
    const [tickers, setTickers] = useState(undefined)
    const [trending, setTrending] = useState(undefined)
    const [trendingOrig, setTrendingOrig] = useState(undefined)
    const [exchange, setExchange] = useState('US')
    const [search, setSearch] = useState('-all-')
    const token = useSelector(state => state.auth.token)


    useEffect(() => {
        getTrendingTickers('US', token)
            .then(res => {
                setTrending(res)
                setTrendingOrig(res)
            })
        getTickers(0, 'A', getExchange('US'), token)
            .then(res => {
                setTickers(res)
            })
    }, [])

    const filter = (e) => {
        let search_ = e.target.value === "" ? "-all-" : e.target.value
        setSearch(search_)
        setTrending(trendingOrig.filter(t => (t.description.includes(search_) || t.ticker.includes(search_) || search_ === '')))
        getTickers(0, search_, getExchange(exchange), token)
            .then(res => {
                setTickers(res)
            })
    }
    const handleChange = (e) => {
        setExchange(e.target.value)
        getTickers(0, search, getExchange(e.target.value), token)
            .then(res => {
                setTickers(res)
            })
    }

    const imgUrl = `${process.env.PUBLIC_URL}/images/flags/`
    if (tickers) {
        return (
            <>
                <div className={classes.filter}>
                    <TextField id="standard-basic" label="Search" onChange={filter} className={classes.searchFilter} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Exchange</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exchange}
                            onChange={handleChange}

                        >
                            <MenuItem value={'BR'} >
                                <span className={classes.formItem}>
                                    <Avatar alt="Remy Sharp" src={imgUrl + 'br.png'} className={classes.small} /> Brazil
                                </span>
                            </MenuItem>
                            <MenuItem value={'US'}>
                                <span className={classes.formItem}>
                                    <Avatar alt="Remy Sharp" src={imgUrl + 'us.png'} className={classes.small} /> US
                                </span>
                            </MenuItem>
                            <MenuItem value={'FR'}>
                                <span className={classes.formItem}>
                                    <Avatar alt="Remy Sharp" src={imgUrl + 'fr.png'} className={classes.small} /> France
                                </span>
                            </MenuItem>
                            <MenuItem value={'DE'}>
                                <span className={classes.formItem}>
                                    <Avatar alt="Remy Sharp" src={imgUrl + 'de.png'} className={classes.small} /> Germany
                                </span>
                            </MenuItem>

                        </Select>
                    </FormControl>
                </div>
                <div className={classes.wrapper}>
                    {trending && trending.map(t => {
                        return (
                            <div key={'_' + Math.random().toString(36).substr(2, 9).toString()}>
                                <TrendingCard ticker={t} {...props} />
                            </div>
                        )
                    })}
                    {tickers.map(t => {
                        return (
                            <div key={'_' + Math.random().toString(36).substr(2, 9).toString()}>
                                <TickerCard ticker={t} {...props} />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    } else {

        return null
    }
}
