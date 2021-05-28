import {React, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { border, positions } from '@material-ui/system';
import InputBase from '@material-ui/core/InputBase';

const CssTextField = withStyles({
    root: {
        border: 'none',
        '& label.Mui-focused': {
            margin: '-10px',
            border: 'none',
        },
        '& label': {
            margin: '-10px',
            border: 'none',
        },
        '& .MuiInput-underline:after': {
        },
        '& .MuiOutlinedInput-root': {
            width: '260px',
            height: '100%',
            '& fieldset': {
                display: 'flex',
                margin: '-15px',
                border: 'none',
                
            }
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

function NoteCard(props) {
    const classes = useStyles();
    const [text, setText] = useState(props.params.text)
    console.log("props", props)

    const changeParams = (e) =>{
        setText(e.target.value)
        props.changeParams({id: props.i, content:{text: e.target.value}})
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <CssTextField
                    className={classes.margin}
                    label="Note"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    multiline
                    onChange={changeParams}
                    value={text}
                />
            </CardContent>
        </Card>


    );
}


export function NoteGrid(props) {
    
    const seeprops = () => {
        console.log("props", props)
    }

    return ({
        type: 'note',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props}>
                <span className="grid-menu">
                    <span >
                        {/* <TableSettingMenus options={options} /> */}
                    </span>
                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                </span>
                <div className="grid-content">
                    <NoteCard key={props.i} {...props} />
                </div>

            </div>
        )
    })

}