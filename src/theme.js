import { responsiveFontSizes } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)!important";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#7467ef' },
    secondary: { main: '#ff9e43' },
    background: { default: '#222A45', paper:'#1a2038'},
    text: {primary: '#fff'},
    triad: {
      red: '#FF3D57',
      yellow: '#ff9e43',
      green: '#08ad6c',
    },
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
// /* https://bloomui.com/preview/dashboards/fitness

// transparent: rgba(51, 194, 255, 0.1)   0.1 no fim
// green: #44D600
// orange: #CB3C1D
// yellow: #FFA319     box-shadow: rgb(255 163 25 / 25%) 0px 1px 4px, rgb(255 163 25 / 35%) 0px 3px 12px 2px;
// rosa: #FF1943                   rgb(255 25 67 / 25%) 0px 1px 4px, rgb(255 25 67 / 35%) 0px 3px 12px 2px;
// blue: #33C2FF

// black: #090A0C
// grey: #252525

// -----------------------
// https://matx-react.ui-lib.com/dashboard/alternative
// rosa: #FF3D57
// green: #08ad6c
// yellow: #ff9e43
// primary: #7467ef
// secondary: #ff9e43

// bg:#1a2038
// bgpap: #222A45




// /*