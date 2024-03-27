import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, createMuiTheme } from "@mui/material";

function ColoredButton(props) {
  const { color, children, theme } = props;
  const buttonTheme = createMuiTheme({
    ...theme,
    palette: {
      primary: {
        main: color,
      },
    },
  });
  const buttonProps = (({ color, theme, children, ...o }) => o)(props);
  return (
    <Button {...buttonProps} color="primary">
      {children}
    </Button>
  );
}

ColoredButton.propTypes = {
  color: PropTypes.string.isRequired,
};

export default memo(ColoredButton);
