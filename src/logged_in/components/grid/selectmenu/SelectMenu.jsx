import { React, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { getGridsIdentifiers } from '../../../../shared/functions/requests.js';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
        transition: 'all 300ms',
        width: 'auto',
        zIndex: 4,
        "&:hover": {
            transform: 'scale(2.5)',
            transition: 'all 400ms',
            paddingBottom: 200,
            zIndex: 3
        }
    },
    plus:{
    }

});

export function SelectMenu() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [identifiers, setIdentifiers] = useState([]);
    const myRef = useRef(null)
    const user = useSelector(state => state.auth.user)
    const executeScroll = (e) => {
        myRef.current.scrollLeft = myRef.current.scrollLeft + 5 * e.movementX//myRef.current.scrollLeft -e.offsetX + "px";
    }

    useEffect(() => {
        console.log("TEM Q VIR")
        getGridsIdentifiers(user)
            .then(res => {
                setIdentifiers(res)
            })
    }, [])

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
                    {identifiers.map(el => {
                        return (
                            <span className={classes.itens}>
                                <BottomNavigationAction label="Favorites" icon={el} />
                            </span>
                        )
                    })}
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={<LibraryAddIcon/>} />
                    </span>

                </BottomNavigation>
            </div>
        </div>
    );
}