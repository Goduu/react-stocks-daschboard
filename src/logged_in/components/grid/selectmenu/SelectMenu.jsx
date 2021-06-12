import { React, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { getGridsIdentifiers } from '../../../../shared/functions/requests.js';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles({
    root: {
        width: 500,
        overflow: 'hidden',
        height: 150,
        background: 'none',

    },
    menuWrapper: {
        position: 'relative',
        paddingBottom: '40px'
    },
    menu: {
        position: 'absolute',
        top: -110,
        left: 400
    },
    itens: {
        paddingTop: 100,
        transition: 'all 200ms',
        width: 'auto',
        zIndex: 4,
        "&:hover": {
            transform: 'scale(2)',
            transition: 'all 200ms',
            paddingBottom: 200,
            zIndex: 3
        }
    },
    plus: {
    }

});

/*
* Top menu of the grid with the tickers 
*  select a ticker to chose its dashboard
*/
export function SelectMenu(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [identifiers, setIdentifiers] = useState([]);
    const myRef = useRef(null)
    const userId = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)

    const executeScroll = (e) => {
        myRef.current.scrollLeft = myRef.current.scrollLeft + 5 * e.movementX//myRef.current.scrollLeft -e.offsetX + "px";
    }

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
        <div className={classes.menuWrapper}>
            <div className={classes.menu}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                    onMouseMove={(e) => executeScroll(e)}
                    ref={myRef}
                >
                    <ArrowBackIosIcon />
                    {identifiers.map(el => {
                        return (
                            <span key={el} className={classes.itens} onClick={() => props.selectDashboard(el)}>
                                <BottomNavigationAction label="Favorites" icon={el} />
                            </span>
                        )
                    })}
                    <ArrowForwardIosIcon />
                </BottomNavigation>
            </div>
        </div>
    );
}

