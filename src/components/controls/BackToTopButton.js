import React from "react";
import BackToTop from "react-back-to-top-button";
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        border: "solid 2px",
        borderRadius: "15px",
        backgroundColor: theme.palette.background.default,

    }
}));

export default function BackToTopButton() {
    const classes = useStyles();

    return (
        <BackToTop
            showOnScrollUp
            showAt={50}
            speed={1500}
            easing="easeInOutQuint"
        >
            <ArrowDropUpOutlinedIcon
                className={classes.button}
                color="primary"
                fontSize="large"
            />
        </BackToTop>
    );
}