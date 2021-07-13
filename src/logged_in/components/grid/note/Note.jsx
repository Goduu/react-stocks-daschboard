import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NoteInterface } from './NoteInterface'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        width: '96%',
        border: 'none',
        '& label.Mui-focused': {
            border: 'none',
            marginTop: '10px'
        },
        '& label': {
            border: 'none',
            marginTop: '10px'

        },
        '& .MuiInput-underline:after': {
        },
        '& .MuiOutlinedInput-root': {
            width: '100%',
            height: '100%',
            '& fieldset': {
                display: 'flex',
                border: 'none',

            }
        },

    },
}));

function Note(props) {
    const classes = useStyles();
    const [text, setText] = useState(props.params.text)

    const changeText = (e) => {
        setText(e.target.value)
    }
    const saveParams = (e) => {
        props.changeParams({ id: props.i, content: { text: e.target.value } })
    }
    return (
        <NoteInterface
            text={text}
            saveParams={saveParams}
            changeText={changeText}
            classes={classes}
            {...props} />
    );
}


export { Note }