
import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { fetchNews } from '../../../../shared/functions/requests.js';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        maxHeight: 220,
        height: 209,
        border: '1px solid rgba(255, 255, 255, 0.12)'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    stepper: {
        position: 'absolute',
        left: '7%',
        maxWidth: '100%',
        flexGrow: 1,
        background: theme.palette.background.paper,
        bottom: '5px'
    },
    authorDate: {
        textOverflow: 'ellipsis!important',
        overflow: 'hidden',
    },
    text: {
        textOverflow: 'ellipsis!important',
        overflow: 'hidden',
        whiteSpace: 'wrap',
        display: 'inline-block'
    }
}));




function News(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [news, setNews] = React.useState([])
    let ticker = props.identifier

    useEffect(() => {
        fetchNews(ticker)
            .then(res => {
                let news_ = []
                res.data.forEach(d => news_.push(d))
                setNews(news_)
            })
    }, [ticker])

    useEffect(() => {
        // setNews(
        //     [{
        //         source: 'Zequin von Stadt',
        //         date: 'Semptember 20, 2021',
        //         text: 'In this article we discuss the 10 best cheap tech stocks to buy according to Mario Gabelli. If you want to skip our detailed analysis of Gabelli‘s history, and hedge fund performance, go directly to the 5 Best Cheap Tech Stocks to Buy According to Mario Gabelli. Mario Gabelli, the billionaire who heads New York-based […]',
        //         link: 'https://finance.yahoo.com/news/10-best-cheap-tech-stocks-171446411.html?.tsrc=rss'
        //     },
        //     {
        //         source: 'Zequin2 von Stadt',
        //         date: 'Semptember 20, 2021',
        //         text: 'In this 13article we discuss the 10 best cheap tech stocks to buy according to Mario Gabelli. If you want to skip our detailed analysis of Gabelli‘s history, and hedge fund performance, go directly to the 5 Best Cheap Tech Stocks to Buy According to Mario Gabelli. Mario Gabelli, the billionaire who heads New York-based […]',
        //         link: 'https://finance.yahoo.com/news/10-best-cheap-tech-stocks-171446411.html?.tsrc=rss'
        //     },
        //     {
        //         source: 'Marie de France',
        //         date: 'Semptember 10, 2021',
        //         text: 'NEW YORK, NY / ACCESSWIRE / April 29, 2021 / Weg S. (OTC PINK:WEGZY) will be discussing their earnings results in their 2021 First Quarter Earnings call to be held on April 29, 2021 at 11:00 AM Eastern Time.',
        //         link: 'https://finance.yahoo.com/news/10-best-cheap-tech-stocks-171446411.html?.tsrc=rss'
        //     }]
        // )
    }, [])

    const preventDefault = (event) => event.preventDefault();



    function DotsMobileStepper() {

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };


        useEffect(() => {
            const interval = setInterval(() => {
                if (activeStep === news.length - 1) {
                    setActiveStep(0)
                } else {
                    handleNext()
                }
            }, 6000);

            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }, [])

        return (
            <MobileStepper
                variant="dots"
                steps={news.length}
                position="static"
                activeStep={activeStep}
                className={classes.stepper}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === news.length - 1}>

                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

                    </Button>
                }
            />
        );
    }


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <FiberNewIcon />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={news[activeStep] && news[activeStep].source}
                subheader={news[activeStep] && news[activeStep].date}
                className={classes.authorDate}
            />
            <CardContent className={classes.contentWrapper}>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                    <Link href={news[activeStep] && news[activeStep].link} target="_blank" color="inherit">
                        {news[activeStep] && news[activeStep].text}
                    </Link>
                </Typography>
            </CardContent>
            <DotsMobileStepper />
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    );
}

export default function NewsGrid(props) {

    return ({
        type: 'note',
        i: props.i,
        content: (
            <div key={props.i} data-grid={props} className="MuiPaper-elevation1">
                <span className="grid-menu">
                    <span onClick={() => props.onRemoveItem(props.i)}>
                        <CloseIcon fontSize="small" />
                    </span>
                    <CloseIcon fontSize="small" />
                </span>
                <News {...props} />
            </div>)
    }
    );
}