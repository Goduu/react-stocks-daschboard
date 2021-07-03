import { React, useState } from 'react';
import { TextField, Paper, CardContent, Card } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CardWrapper from '../Card'

const NoteTextField = withStyles({
    root: {
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
})(TextField);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        width: '96%'

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
            <NoteTextField
                className={classes.margin}
                label="Note"
                variant="outlined"
                multiline
                onChange={changeParams}
                onBlur={saveParams}
                value={text}
            />
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