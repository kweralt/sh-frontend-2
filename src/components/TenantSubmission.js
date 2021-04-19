import { useState } from "react";
import {
    makeStyles,
    Paper,
    List,
    Typography,
    TextField,
    IconButton,
} from "@material-ui/core";
import ContentWrapper from "../components/ContentWrapper";
import FormItem from "../components/FormItem";
import { ArrowBack } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
// import { sizing } from '@material-ui/system';
// import { RMIUploader } from "react-multiple-image-uploader";
import ImageUploader from "react-images-upload";

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

const imageExtensions = [".jpg", ".jpeg", ".gif", ".png"];

export default function TenantSubmission() {
    const classes = useStyles();
    const {state} = useLocation();
    const [visible, setVisible] = useState(false);
    const handleSetVisible = () => {
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };
    const onUpload = (data) => {
        console.log("Upload files", data);
    };
    const onSelect = (data) => {
        console.log("Select files", data);
    };
    const onRemove = (id) => {
        console.log("Remove image id", id);
    };
    return (
        <ContentWrapper>
        <div className={classes.root} width="100%">
            <IconButton to="/actions" component={Link}>
                <ArrowBack fontSize="large"/>
            </IconButton>
            <Typography align="center" variant='h5' gutterbottom>Audit Feedback</Typography>
            <Paper>
                <List>
                    <FormItem data={state}/>
                </List>
            </Paper>
                <Typography align="center" variant='h5' gutterbottom>Rectification Report</Typography>
            <Paper>
                <TextField
                    // id="notes"
                    label="Notes"
                    multiline
                    fullWidth
                    rows='5'
                />
            </Paper>
            <Paper>
                <ImageUploader
                    label="Rectification Photos"
                    withPreview={true}
                />
            </Paper>
        </div>
        </ContentWrapper>
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