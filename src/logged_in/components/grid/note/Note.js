import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Box,
  } from "@material-ui/core";



export function NoteGrid(props) {
    return ({
        type: 'note',
        i: props.i,
        content: (
            <CardContent key={props.i}>
                
                    <div  data-grid={props} className="MuiPaper-elevation1">
                        <span className="grid-menu">
                            <span >
                                {/* <TableSettingMenus options={options} /> */}
                            </span>
                            <span onClick={() => props.onRemoveItem(props.i)}>
                                <CloseIcon fontSize="small" />
                            </span>
                        </span>
                        <div >
                            <TextField
                                id="outlined-multiline-static"
                                label="Note"
                                multiline
                                rows={9}
                                defaultValue=""
                                variant="outlined"
                                color="secondary"
                                fullWidth={true}
                            />
                        </div>
                    </div>
            </CardContent>
        )
    }
    );
}