import { React, useState, useEffect } from 'react';

// import { fetchEsgRisk } from '../../../../shared/functions/requests.js';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartSettings from './ChartSettings'
import { format } from "date-fns";
import _ from 'lodash'
import Card from '../Card'

import {
    Paper,
    Grid,
    Typography,
} from "@material-ui/core";


const CustomTooltip = props => {
    const { active, payload, label } = props;
    if (active) {
        return (
            <div>
                <p>
                    {label ? format(label, "yyyy-MM-dd") : " -- "}
                </p>
                <div>
                    {payload && payload.map(pld => {
                        return (
                            <p key={pld.dataKey}>{pld.dataKey}:
                                {pld ? pld.payload[pld.dataKey].toFixed(2) : " -- "}</p>)
                    })
                    }
                </div>
            </div>
        );
    }

    return null;
};


function MultichartInterface(props) {
    const { classes, configOpen, charts, chartsData, title, subtitle, params } = props

    const { saveSettings, dateFormatter, setConfigOpen } = props

    return (
        <Card openSettings={() => setConfigOpen(!configOpen)} {...props}>
            <ChartSettings open={configOpen} saveSettings={saveSettings} settings={params.charts}></ChartSettings>
            <div className={classes.header}>
                <Grid
                    justify="space-between"
                    alignItems="flex-start"
                    container spacing={1}>
                    <Grid xs={6} >
                        <Typography variant="subtitle1">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Last {subtitle} Days
                        </Typography>

                    </Grid>

                </Grid>
            </div>

            <div className={classes.chart}>
                {(chartsData.length > 0 && charts.length > 0) &&
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={chartsData}
                            type="number"
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="date" tickFormatter={dateFormatter} hide />
                            <YAxis
                                domain={[dataMin => (0.95 * dataMin), dataMax => (1.05 * dataMax)]}
                                yAxisId="right"
                                orientation="right"
                                hide
                            />
                            <YAxis
                                domain={[dataMin => (0.95 * dataMin), dataMax => (1.05 * dataMax)]}
                                yAxisId="left"
                                orientation="left"
                                hide
                            />
                            <Tooltip content={<CustomTooltip />} />
                            {/* <Legend /> */}
                            {charts.map(el => {
                                if (el.type === 'bar') {
                                    return <Bar
                                        key={el.name}
                                        dataKey={el.name}
                                        barSize={300}
                                        fill={el.color}
                                        yAxisId={el.pos}
                                        name={el.name} />
                                } else if (el.type === 'line') {
                                    return <Line
                                        key={el.name}
                                        dataKey={el.name}
                                        stroke={el.color}
                                        strokeWidth={2}
                                        dot={false}
                                        yAxisId={el.pos}
                                        connectNulls />
                                }
                            })}

                        </ComposedChart>
                    </ResponsiveContainer>
                }

            </div>
        </Card>
    )
}





export { MultichartInterface }