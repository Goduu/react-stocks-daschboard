import { React } from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import EcoIcon from '@material-ui/icons/Eco';
import { green } from '@material-ui/core/colors';
import Card from '../Card'


function EsgInterface(props) {

    const { classes, t, esgs, valuetext } = props
    const { getColor } = props

    return (
        <Card {...props}>
            {esgs &&
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div className={classes.header}>
                            <Typography variant="h6" >
                                ESG Risk
                                <EcoIcon style={{ color: green[500] }} />
                                <Chip variant="outlined" size="small" label={t('esg.' + esgs.performance)} />
                            </Typography>

                        </div>
                    </Grid>
                    {esgs.scores.map(esg => {
                        return (
                            <Grid item xs={6} key={esg.title}>
                                <div className={classes.slider}>
                                    <Typography gutterBottom>
                                        {t('esg.' + esg.title)}
                                    </Typography>

                                    <Slider
                                        track={false}
                                        aria-labelledby="track-false-slider"
                                        getAriaValueText={valuetext}
                                        value={esg.value}
                                        min={esg.peers.find(p => p.label === 'Min').value}
                                        step={0.1}
                                        max={esg.peers.find(p => p.label === 'Max').value}
                                        marks={esg.peers}
                                        valueLabelDisplay="auto"
                                        style={{ color: getColor(esg) }}

                                    />
                                </div>
                            </Grid>
                        )
                    })}

                </Grid>
            }
        </Card>
    );

}


export { EsgInterface }