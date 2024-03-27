import { React } from 'react';
import { TextField } from '@mui/material';
import CardWrapper from '../Card'
import PropTypes from "prop-types";
import { InputBase, ClickAwayListener } from '@mui/material';

function TitleInterface(props) {
    const { title, classes, subtitle } = props
    const { saveParams, changeTitle, saveSubtitle, changeSubtitle } = props


    return (
        <CardWrapper {...props} >
            <InputBase
                className={classes.margin}
                onChange={changeTitle}
                onBlur={saveParams}
                value={title}
                data-testid="textField"
            />
            <InputBase
                className={classes.subtitle}
                onChange={changeSubtitle}
                onBlur={saveSubtitle}
                value={subtitle}
                data-testid="textField"
            />
        </CardWrapper>


    );
}

TitleInterface.propTypes = {
    text: PropTypes.string,
    classes: PropTypes.object.isRequired,
    saveParams: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
};

export { TitleInterface }