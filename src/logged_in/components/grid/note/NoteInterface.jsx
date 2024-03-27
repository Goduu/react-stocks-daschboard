import { React } from 'react';
import { TextField } from '@mui/material';
import CardWrapper from '../Card'
import PropTypes from "prop-types";


function NoteInterface(props) {
    const { text, classes, saveParams, changeText } = props


    return (
        <CardWrapper {...props}>
            <TextField
                className={classes.margin}
                label="Note"
                variant="outlined"
                multiline
                onChange={changeText}
                onBlur={saveParams}
                value={text}
                data-testid="textField"
            />
        </CardWrapper>


    );
}

NoteInterface.propTypes = {
    text: PropTypes.string,
    classes: PropTypes.object.isRequired,
    saveParams: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
};

export { NoteInterface }