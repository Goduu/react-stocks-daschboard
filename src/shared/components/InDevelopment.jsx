import { makeStyles } from '@mui/styles';
import BuildIcon from '@mui/icons-material/Build';
import { Tooltip } from '@mui/material';
import { yellow } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
    "@keyframes spin": {
        '0%': { transform: "rotate(-30deg)" },
        '50%': { transform: "rotate(30deg)" },
        '100%': { transform: "rotate(-30deg)" },
    },
    spin: {
        animation: "$spin 2s infinite linear",
        color: yellow[500],
        marginLeft: theme.spacing(1)
    },

}));


function InDevelopment(props) {
    const classes = useStyles()

    return (
        <Tooltip title={"In development..."}>
            <BuildIcon className={classes.spin} />
        </Tooltip>
    )


}

export { InDevelopment }

