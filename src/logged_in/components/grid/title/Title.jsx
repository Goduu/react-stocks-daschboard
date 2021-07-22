import { createRef, React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleInterface } from './TitleInterface'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(0),
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
    const changeTitle = (e) => {
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
            changeTitle={changeTitle}
            classes={classes}
            saveSubtitle={saveSubtitle}
            changeSubtitle={changeSubtitle}
            {...props} />
    );
}


export { Title }