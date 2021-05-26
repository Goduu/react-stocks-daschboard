import { React, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        width: 500,
        overflow: 'hidden',
        height: 200,
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

});

export function SelectMenu() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const myRef = useRef(null)
    const executeScroll = (e) => {
        myRef.current.scrollLeft = myRef.current.scrollLeft + 5 * e.movementX//myRef.current.scrollLeft -e.offsetX + "px";
    }

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
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'MING'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'WEG3'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'1AAPL'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'POW'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'VLTS'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'EEE'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'NNN'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'12AAPL'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'AER'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'DFTR'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'EEE'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'NNN'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'AAPL'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'AER'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'DFTR'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'EEE'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'NNN'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'AAPL'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'AER'} />
                    </span>
                    <span className={classes.itens}>
                        <BottomNavigationAction label="Favorites" icon={'XONG'} />
                    </span>


                </BottomNavigation>
            </div>
        </div>
    );
}