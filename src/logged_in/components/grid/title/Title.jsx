import { createRef, React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleInterface } from './TitleInterface'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        width: '96%',
        fontSize: '1.5em',
        fontWeight: 700,
        border: 'none',

    },
    subtitle: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(-1),
        fontSize: '0.875rem',
        fontWeight: 400
    }
}));

function Title(props) {
    const classes = useStyles();
    const [title, setTitle] = useState(props.params.title)
    const [subtitle, setSubtitle] = useState(props.params.subtitle)
    const inputRef = createRef()
    const changeText = (e) => {
        setTitle(e.target.value)
    }
    const changeSubtitle = (e) => {
        setSubtitle(e.target.value)
    }
    const saveParams = (e) => {
        props.changeParams({ id: props.i, content: { title: e.target.value, subtitle: subtitle } })
    }   
    const saveSubtitle = (e) => {
        console.log('save paha', e.target.value)
        props.changeParams({ id: props.i, content: { title: title , subtitle: e.target.value } })
    }

    

    return (
        <TitleInterface
            title={title}
            subtitle={subtitle}
            saveParams={saveParams}
            changeText={changeText}
            classes={classes}
            inputRef={inputRef}
            saveSubtitle={saveSubtitle}
            changeSubtitle={changeSubtitle}
            {...props} />
    );
}


export { Title }