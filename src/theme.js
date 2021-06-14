import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)!important";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#8a17fe' },
    secondary: { main: '#ec125a' },
    // background: { default: '#141818', paper:'#1c1d1c!important'},
    // text: {primary: '#ffffff!important'}
    text: {
      green: '#4caf50'
    }
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth
  },
});

export default responsiveFontSizes(theme);
