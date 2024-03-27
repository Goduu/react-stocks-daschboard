import React from "react";
import PropTypes from "prop-types";
import { DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {} from "@mui/material";
import { withTheme } from "@mui/styles";
import AccessTime from "@mui/icons-material/AccessTime";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DateRange from "@mui/icons-material/DateRange";

function DateTimePicker(props) {
  const { disabled, value, onChange } = props;
  return (
    <MUIDateTimePicker
      inputVariant="outlined"
      leftArrowIcon={<KeyboardArrowLeft />}
      rightArrowIcon={<KeyboardArrowRight />}
      timeIcon={<AccessTime />}
      dateRangeIcon={<DateRange />}
      variant="outlined"
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...props}
      inputProps={{ style: { width: "100%", cursor: "pointer" } }}
    />
  );
}

DateTimePicker.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default withTheme(DateTimePicker);
