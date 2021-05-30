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
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { fetchDividendData } from '../../../../shared/functions/requests'

// const styles = (theme) => ({
//   cardContentInner: {
//     marginTop: theme.spacing(-4),
//   },
// });

// function labelFormatter(label) {
//   return new Date(label);
// }

// function calculateMin(data, yKey, factor) {
//   let max = Number.POSITIVE_INFINITY;
//   data.forEach((element) => {
//     if (max > element[yKey]) {
//       max = element[yKey];
//     }
//   });
//   return Math.round(max - max * factor);
// }

const itemHeight = 216;
const options = ["6 Months", "1 Year", "5 Years", "Max"];

function DividendChart(props) {
  // const { color, data, title, classes, theme, height } = props;
  const { title } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(props.params.period);
  const [chartData, setChartData] = useState([]);

  let ticker = props.identifier
  useEffect(() => {
    fetchDividendData(ticker, 180)
      .then(res => {
        setChartData(res.data)
      })
  }, [props.identifier,ticker])

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  // const formatter = useCallback(
  //   (value) => {
  //     return [value, title];
  //   },
  //   [title]
  // );

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
          period = -1;
          break;
        default:
          period = 30
      }
      fetchDividendData(ticker, period)
        .then(res => {
          setChartData(res.data)
        })
      props.changeParams({ id: props.i, content: { period: selectedOption_ } })
      handleClose();
    },
    [setSelectedOption, handleClose,props,ticker]
  );

  const isOpen = Boolean(anchorEl);
  return (
    <Box height={'100px'}>
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
            {/* <Box className={classes.cardContentInner} height={height}> */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} type="number" margin={{ top: 0, left: 1, right: 1, bottom: 0 }}>
                <Bar type="monotone" dataKey="value" fill="#8884d8" strokeWidth={2} dot={false} />
                <YAxis domain={[0, 'dataMax']} hide />
                <XAxis dataKey="timestamp" tickFormatter={timeStr => moment(timeStr).format('YYYY-MM-DD')} hide/>
                <Tooltip
                  labelFormatter={timeStr => moment(timeStr).format('YYYY-MM-DD')}
                  // formatter={formatter}
                  cursor={false}
                  contentStyle={{
                    border: "none",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
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
          <span onClick={props.onRemoveItem}>
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