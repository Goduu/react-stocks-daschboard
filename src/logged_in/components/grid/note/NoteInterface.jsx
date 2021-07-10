import { React } from 'react';
import { TextField } from '@material-ui/core';
import CardWrapper from '../Card'


function NoteInterface(props) {
    const {text, classes,saveParams,changeParams} = props

    
    return (
        <CardWrapper {...props}>
            <TextField
                className={classes.margin}
                label="Note"
                variant="outlined"
                multiline
                onChange={changeParams}
                onBlur={saveParams}
                value={text}
                data-testid="textField"
            />
        </CardWrapper>


    );
}


export {NoteInterface}