import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import format from "date-fns/format";
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

const styles = (theme) => ({
  cardContentInner: {
    marginTop: theme.spacing(-4),
  },
});

function labelFormatter(label) {
  return format(new Date(label * 1000), "MMMM d, p yyyy");
}

function calculateMin(data, yKey, factor) {
  let max = Number.POSITIVE_INFINITY;
  data.forEach((element) => {
    if (max > element[yKey]) {
      max = element[yKey];
    }
  });
  return Math.round(max - max * factor);
}

const itemHeight = 216;
const options = ["6 Months", "1 Year", "3 Years"];

function PriceChart(props) {
  const { color, data, title, classes, theme, height } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("6 Months");

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
        return "Last 6 months";
      case "1 Year":
        return "Last year";
      case "3 Years":
        return "Last 3 years";
      default:
        throw new Error("No branch selected in switch-statement");
    }
  }, [selectedOption]);

  const processData = useCallback(() => {
    let seconds;
    switch (selectedOption) {
      case "6 Months":
        seconds = 60 * 60 * 24 * 7;
        break;
      case "1 Year":
        seconds = 60 * 60 * 24 * 31;
        break;
      case "3 Years":
        seconds = 60 * 60 * 24 * 31 * 6;
        break;
      default:
        throw new Error("No branch selected in switch-statement");
    }
    const minSeconds = new Date() / 1000 - seconds;
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      if (minSeconds < data[i].timestamp) {
        arr.unshift(data[i]);
      }
    }
    return arr;
  }, [data, selectedOption]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const selectOption = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption);
      handleClose();
    },
    [setSelectedOption, handleClose]
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
              <BarChart data={processData()} type="number">
                <Bar type="monotone" dataKey="value" fill="#8884d8"/>
                <Tooltip
                  labelFormatter={labelFormatter}
                  formatter={formatter}
                  cursor={false}
                  contentStyle={{
                    border: "none",
                    // padding: theme.spacing(1),
                    // borderRadius: theme.shape.borderRadius,
                    // boxShadow: theme.shadows[1],
                  }}
                // labelStyle={theme.typography.body1}
                // itemStyle={{
                //   fontSize: theme.typography.body1.fontSize,
                //   letterSpacing: theme.typography.body1.letterSpacing,
                //   fontFamily: theme.typography.body1.fontFamily,
                //   lineHeight: theme.typography.body1.lineHeight,
                //   fontWeight: theme.typography.body1.fontWeight,
                // }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

PriceChart.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
};
let dataXongas = [
  {
    value: 5685,
    timestamp: 1621433840
  },
  {
    value: 1685,
    timestamp: 1621434840
  },
  {
    value: 8285,
    timestamp: 1621435840
  },
  {
    value: 5985,
    timestamp: 1621436840
  },
  {
    value: 6685,
    timestamp: 1621437840
  },
  {
    value: 7285,
    timestamp: 1621438840
  },
  {
    value: 4285,
    timestamp: 1621439840
  },
  {
    value: 8285,
    timestamp: 1621440840
  },
  {
    value: 3285,
    timestamp: 1621441840
  },
  {
    value: 5285,
    timestamp: 1621442840
  },
  {
    value: 10285,
    timestamp: 1621443840
  },

]

export function BarChartCard(props) {
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
        <PriceChart
          data={dataXongas}
          color={"red"}
          height="100px"
          title="Dividend" />
      </div>
    )
  }
  );
}

// export default withStyles(styles, { withTheme: true })(LineChartCard);
