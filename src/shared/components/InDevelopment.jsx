import { makeStyles } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import {Tooltip} from '@material-ui/core';
import { yellow } from "@material-ui/core/colors";

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

export {InDevelopment}

