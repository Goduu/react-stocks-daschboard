import { React, useState } from 'react';
import { TextField, Paper, CardContent, Card } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CardWrapper from '../Card'

const NoteTextField = withStyles({
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
        spellcheck: "false"
    },
}));

function NoteCard(props) {
    const classes = useStyles();
    const [text, setText] = useState(props.params.text)

    const changeParams = (e) => {
        setText(e.target.value)
    }
    const saveParams = (e) => {
        props.changeParams({ id: props.i, content: { text: e.target.value } })
    }
    return (
        <CardWrapper {...props}>
                <CardContent>
                    <NoteTextField
                        className={classes.margin}
                        label="Note"
                        variant="outlined"
                        multiline
                        onChange={changeParams}
                        onBlur={saveParams}
                        value={text}
                    />
                </CardContent>
        </CardWrapper>


    );
}


export function NoteGrid(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <Paper key={props.i} data-grid={props}>

                <NoteCard key={props.i} {...props} />

            </Paper>
        )
    })

}