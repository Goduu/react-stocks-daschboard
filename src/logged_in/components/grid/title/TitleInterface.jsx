import { React } from 'react';
import { TextField } from '@material-ui/core';
import CardWrapper from '../Card'
import PropTypes from "prop-types";
import { InputBase, ClickAwayListener } from '@material-ui/core';

function TitleInterface(props) {
    const { title, classes, inputRef, subtitle } = props
    const { saveParams, changeTitle, saveSubtitle, changeSubtitle } = props


    return (
        <CardWrapper {...props} >
            <InputBase
                className={classes.margin}
                onChange={changeTitle}
                onBlur={saveParams}
                value={title}
                data-testid="textField"
                inputRef={inputRef}
            />
            <InputBase
                className={classes.subtitle}
                onChange={changeSubtitle}
                onBlur={saveSubtitle}
                value={subtitle}
                data-testid="textField"
                inputRef={inputRef}
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