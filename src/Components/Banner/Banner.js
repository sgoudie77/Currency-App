import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner6.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    bannerOverlay: {
        height: 593,
        width: "100%",
        position: "absolute",
        top: 64,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    bannerContent: {
        height: 593,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "50%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 5,
    },
}));

const Banner = () => {
    const classes = useStyles();
    
    return (
    <div className={classes.banner}>
        <div className={classes.bannerOverlay}></div>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                    variant="h2" 
                    style={{
                        fontWeight: "500",
                        marginBottom: 5,
                        fontFamily: "Montserrat",
                    }}
                >
                    Crypto Tracker
                </Typography>
                <Typography
                    variant="subtitle3" 
                    style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        marginBottom: 45,
                    }}
                >
                    Get The Latest Cryptocurrency Market Rates
                </Typography>
                <Carousel />
            </div>
        </Container>
    </div>
  )
}

export default Banner