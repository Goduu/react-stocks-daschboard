import React, { useState } from 'react';
import {
    Menu, MenuItem
} from '@material-ui/core/';
import { useEffect } from 'react';
import _ from 'lodash'
import { useTranslation } from 'react-i18next';

export default function StatisticsSettings(props) {
    const { saveSettings } = props;
    // const [open, setOpen] = useState(props.open);
    const [statistics, setStatistics] = useState(props.statistics);
    const [open, setOpen] = React.useState(props.open);
    const { t } = useTranslation();


    useEffect(() => {
        setOpen(!open)
    }, [props.anchorEl])

    useEffect(() => {
        setStatistics(props.statistics)
    }, [props.statistics])

    const handleSave = (value) => {
        saveSettings(value);
        props.anchorEl[1](null)
        setOpen(false);
        // setSelectedValue(value);
    };


    return (
        <Menu
            id="simple-menu"
            keepMounted
            open={Boolean(props.anchorEl[0])}
            onClose={() => props.anchorEl[1](null)}
            anchorEl={props.anchorEl[0]}
        >

            {statistics && statistics.map((value) => {
                return (
                    <MenuItem
                        key={value.label}
                        value={value.label}
                        onClick={() => handleSave(value.label)}
                    >
                        {t('indicators.'+value.label)}

                    </MenuItem>
                );
            }
            )}


        </Menu >

    );
}

