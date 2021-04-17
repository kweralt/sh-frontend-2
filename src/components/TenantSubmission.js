import { useEffect, useState } from "react";
import {
    makeStyles,
    Paper,
    List,
    Typography,
    TextField,
} from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import FormItem from "../components/FormItem";
import { RMIUploader } from "react-multiple-image-uploader";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

export default function TenantSubmission() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper>
                <Typography align="center" variant='h5' gutterbottom>Audit Feedback</Typography>
                <List>
                </List>
            </Paper>
            <br/>
            <Paper>
                <Typography align="center" variant='h5' gutterbottom>Rectification Report</Typography>
                <TextField
                    // id="notes"
                    label="Notes"
                    multiline
                    fullWidth
                    rows='5'
                />
            </Paper>
        </div>
    )
}

const tdata = [
    {
        "formId": 0,
        "deadline": "11-04-2021",
        "auditor": "Kiawee",
        "phase": "Rectification Needed",
        "content": {
            "safety": false,
            "health": true,
            "notes": "abcdef"
        }
    },
    {
        "formId": 1,
        "deadline": "12-04-2021",
        "auditor": "Caryl",
        "phase": "Rectification Needed",
        "content": {
            "safety": false,
            "health": false,
            "notes": "qwerty"
        }
    },
    {
        "formId": 2,
        "deadline": "13-04-2021",
        "auditor": "Brandon",
        "phase": "Rectification Needed",
        "content": {
            "safety": false,
            "health": true,
            "notes": "yuiop"
        }
    }
]