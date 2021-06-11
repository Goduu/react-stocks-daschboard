import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis
} from "recharts";
import moment from 'moment'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  makeStyles
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { fetchDividendData } from '../../../../shared/functions/requests'
import NoData from '../../../../shared/components/NoData'
import { useSelector} from 'react-redux';


// https://codesandbox.io/s/8m6n8?file=/src/Chart.jsx candelstick chart



const itemHeight = 216;
const options = ["6 Months", "1 Year", "5 Years", "Max"];


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '5px'
  },
}))

function DividendChart(props) {
  const classes = useStyles();

  // const { color, data, title, classes, theme, height } = props;
  const { title } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(props.params.period);
  const [chartData, setChartData] = useState();
  const token = useSelector(state => state.auth.token)

  let ticker = props.identifier
  useEffect(() => {
    fetchDividendData(ticker, selectedOption, token)
      .then(res => {
        if (res.PriceHistory) {
          res = res.PriceHistory.map(p => {
            return {...p, date: new Date(p.date.year,p.date.month,p.date.dayOfMonth).toLocaleDateString()}
          })
          setChartData(res)
        }
      })
  }, [ticker,token])

  useEffect(() => {
    firstCall()
  }, [])

  const firstCall = useCallback(() => {
    selectOption(props.params.period)
  },
    [props.params.period]
  );

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const formatter = useCallback(
    (value) => {
      return [value, title];
    },
    [title]
  );

  const getSubtitle = useCallback(() => {
    switch (selectedOption) {
      case "6 Months":
        return "Last semester";
      case "1 Year":
        return "Last year";
      case "5 Years":
        return "Last 5 years";
      case "Max":
        return "Historic Period"
      default:
        return
      // throw new Error("No branch selected in switch-statement");
    }
  }, [selectedOption]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const selectOption = useCallback(
    (selectedOption_) => {
      setSelectedOption(selectedOption_);
      let period = 300
      switch (selectedOption_) {
        case "6 Months":
          period = 180
          break;
        case "1 Year":
          period = 365
          break;
        case "5 Years":
          period = 1825;
          break;
        case "Max":
          period = 30000;
          break;
        default:
          period = 30
      }
      fetchDividendData(ticker, period, token)
        .then(res => {
          res = res.PriceHistory.map(p => {
            return {...p, date: new Date(p.date.year,p.date.month,p.date.dayOfMonth).toLocaleDateString()}
          })
          setChartData(res)
        })
      props.changeParams({ id: props.i, content: { period: selectedOption_ } })
      handleClose();
    },
    [setSelectedOption, handleClose, props, ticker]
  );

  const isOpen = Boolean(anchorEl);

  return (
    <Box height={'100px'} className={classes.root}>
      <Card>
        <Box pt={2} px={2} pb={4}>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {getSubtitle()}
              </Typography>
            </div>
            <div>
              <IconButton
                aria-label="More"
                aria-owns={isOpen ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: itemHeight,
                    width: 200,
                  },
                }}
                disableScrollLock
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === selectedOption}
                    onClick={() => {
                      selectOption(option);
                    }}
                    name={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>
        </Box>
        <CardContent>
          <Box height={'73px'}>
            {chartData ?
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} type="number" margin={{ top: 0, left: 1, right: 1, bottom: 0 }}>
                  <Bar type="monotone" dataKey="adjDividend" fill="#8884d8" strokeWidth={2} dot={false} />
                  <YAxis domain={[0, 'dataMax']} hide />
                  <XAxis dataKey="date"  hide />
                  <Tooltip
                    formatter={formatter}
                    cursor={false}
                    contentStyle={{
                      border: "none",
                      borderRadius: '5px',
                      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                      color: 'black'
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
              : <NoData />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

DividendChart.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default function BarChartCard(props) {
  return ({
    type: 'chart',
    i: props.i,
    content: (
      <div key={props.i} data-grid={props}>
        <span className="grid-menu">
          <span onClick={() => props.onRemoveItem(props.i)}>
            <CloseIcon fontSize="small" />
          </span>
        </span>
        <DividendChart
          {...props}
          color={"red"}
          height="100px"
          title="Dividend" />
      </div>
    )
  }
  );
}