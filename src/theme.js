import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth
  },
});

export default responsiveFontSizes(theme);
