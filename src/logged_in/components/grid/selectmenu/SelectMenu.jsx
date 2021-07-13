import { React, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getGridsIdentifiers } from '../../../../shared/functions/requests.js';
import {SelectMenuInterface} from './SelectMenuInterface'

// '-webkit-mask-image': 'linear-gradient(90deg, #000 96%, transparent)',
const menuWidth = 500
const useStyles = makeStyles((theme) => ({

    menuWrapper: {
        position: 'relative',
        paddingBottom: theme.spacing(1),
        display: 'flex',

    },
    menu: {
        width: menuWidth,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        paddingLeft: theme.spacing(1),
        scrollBehavior: 'smooth'


    },
    itens: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        transition: 'all 200ms',
        width: 'auto',
        zIndex: 4,
        "&:hover": {
            transform: 'scale(1.08)',
        },
        cursor: 'pointer'
    },
    arrowRight: {
        position: 'absolute',
        transition: 'all 200ms',
        marginLeft: -30,
        width: 'auto',
        zIndex: 5,
        "&:hover": {
            transition: 'all 200ms',
        },
        cursor: 'pointer'
    },
    arrowLeft: {
        position: 'absolute',
        marginLeft: menuWidth * 0.99,
        transition: 'all 200ms',
        zIndex: 5,
        "&:hover": {
            // transform: 'scale(2)',
            transition: 'all 200ms',
            zIndex: 3
        },
        cursor: 'pointer'
    }

}));

/*
* Top menu of the grid with the tickers 
*  select a ticker to chose its dashboard
*/
export function SelectMenu(props) {
    const classes = useStyles();
    const [scrollArrow, setScrollArrow] = useState(false);
    const [identifiers, setIdentifiers] = useState([]);
    const [isMaxLeft, setIsMaxLeft] = useState(true);
    const [isMaxRight, setIsMaxRight] = useState(true);
    const myRef = useRef(null)
    const userId = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)

    const executeScroll = (e) => {
        // myRef.current.scrollLeft = myRef.current.scrollLeft + 5 * e.movementX//myRef.current.scrollLeft -e.offsetX + "px";
    }
    const scrollRight = () => {
        let sleft = myRef.current.scrollLeft + 120
        myRef.current.scrollLeft = sleft
        let test = (myRef.current.scrollWidth - sleft) <= myRef.current.clientWidth
        setIsMaxRight((myRef.current.scrollWidth - sleft) <= myRef.current.clientWidth)
        setIsMaxLeft(sleft <= 0)

    }

    const scrollLeft = () => {
        let sleft = myRef.current.scrollLeft - 120
        myRef.current.scrollLeft = sleft
        setIsMaxRight((myRef.current.scrollWidth - sleft) <= myRef.current.clientWidth)
        setIsMaxLeft(sleft <= 0)

    }

    useEffect(() => {
        setScrollArrow(myRef.current.clientWidth >= myRef.current.scrollWidth)
        setIsMaxLeft(myRef.current.scrollLeft <= 0)
        setIsMaxRight(myRef.current.scrollWidth <= myRef.current.clientWidth)
    }, [])

    useEffect(() => {
        setScrollArrow(myRef.current.clientWidth >= myRef.current.scrollWidth)
        // setIsMaxLeft(myRef.current.scrollLeft <= 0)
        setIsMaxRight(myRef.current.scrollWidth <= myRef.current.clientWidth + 4)

    },[myRef.current && myRef.current.scrollWidth])

    useEffect(() => {
        getGridsIdentifiers(userId, token)
            .then(res => {
                setIdentifiers(res)
            })
    }, [userId])

    useEffect(() => {
        getGridsIdentifiers(userId, token)
            .then(res => {
                setIdentifiers(res)
            })
    }, [props.identifier, userId])

    return (
        <SelectMenuInterface
        classes={classes}
        isMaxLeft={isMaxLeft}
        scrollRight={scrollRight}
        scrollLeft={scrollLeft}
        isMaxRight={isMaxRight}
        identifiers={identifiers}
        myRef={myRef} />
    );
}

