import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis
} from "recharts";
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
import { fetchPriceData } from '../../../../shared/functions/requests'
import NoData from '../../../../shared/components/NoData'

// const styles = (theme) => ({
//   cardContentInner: {
//     marginTop: theme.spacing(-4),
//   },
// });

function labelFormatter(label) {
  return new Date(Date.parse(label)).toLocaleDateString();
}

// function calculateMin(data, yKey, factor) {
//   let max = Number.POSITIVE_INFINITY;
//   data.forEach((element) => {
//     if (max > element[yKey]) {
//       max = element[yKey];
//     }
//   });
//   return Math.round(max - max * factor);
// }

const useStyles = makeStyles((theme) => ({
  root: {
      height: '100%',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '5px'
  },
}))

const formatXAxis = (tickItem) => {
  console.log("DATE ", tickItem)
  return new Date.parse(tickItem).toLocaleDateString();
}

const itemHeight = 216;
const options = ["1 Week", "1 Month", "6 Months", "1 Year", "Max"];

function PriceChart(props) {
  const classes = useStyles();

  // const { color, data, title, classes, theme, height } = props;
  const { title } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(props.params.period);
  const [chartData, setChartData] = useState([]);

  let ticker = props.identifier
  useEffect(() => {
    fetchPriceData(ticker, 30)
      .then(res => {
        setChartData(res.PriceHistory)
      })
  }, [ticker])

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
      case "1 Week":
        return "Last week";
      case "1 Month":
        return "Last month";
      case "6 Months":
        return "Last 6 months";
      case "1 Year":
        return "Last Year";
      case "Max":
        return "Historic Period"
      default:
        return ""
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
        case "1 Week":
          period = 7
          break;
        case "1 Month":
          period = 30
          break;
        case "6 Months":
          period = 180;
          break;
        case "1 Year":
          period = 365
          break;
        case "Max":
          period = -1;
          break;
        default:
          period = 30
      }
      fetchPriceData(ticker, period)
        .then(res => {
          console.log('fetched', res)
          setChartData(res.data)
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

              < ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} type="number" margin={{ top: 0, left: 1, right: 1, bottom: 0 }}>
              <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} dot={false} />
              <YAxis domain={['dataMin-0.2*dataMin', 'dataMax+0.2*dataMax']} hide />
              <XAxis dataKey="date" tickFormatter={formatXAxis} hide />
              <Tooltip
                labelFormatter={labelFormatter}
                formatter={formatter}
                cursor={false}
                contentStyle={{
                  border: "none",
                  borderRadius: '5px',
                  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                  color: 'black'
                }}
              
              />
            </LineChart>
            </ResponsiveContainer>
            : <NoData />}
          </Box>
        </CardContent>
      </Card>
    </Box >
  );
}

PriceChart.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};


export default function LineChartCard(props) {

  return ({
    type: 'chart',
    i: props.i,
    content: (
      <div key={props.i} data-grid={props} className="MuiPaper-elevation1">
        <span className="grid-menu">
          <span onClick={() => props.onRemoveItem(props.i)}>
            <CloseIcon fontSize="small" />
          </span>
        </span>
        <PriceChart
          {...props}
          color={"red"}
          height="100px"
          title="Price" />
      </div>
    )
  }
  );
}