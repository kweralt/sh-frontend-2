import {useEffect, useState} from "react";
import {
    makeStyles,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@material-ui/core";
import {
    CallToAction,
} from "@material-ui/icons";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import FormItem from "../components/FormItem";
import Popup from "../components/Popup";
import TenantSubmission from "../components/TenantSubmission";
import { Link, useLocation } from "react-router-dom";

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

export default function TenantActions(){
    const classes = useStyles();
    // const [openPopup, setOpenPopup] = useState(false);
    const onClick = () => {
        console.log("hey")
    }

    return (
        <ContentWrapper>
            <div className={classes.root}>
                <PageHeader
                    title="Tenant Action Center"
                    subTitle="Non-compliance Rectification"
                    icon={<CallToAction fontSize="large" />}/>
                <Paper>
                    <List>
                        {tdata.map((item) => (
                            <FormItem 
                                data={item}
                                onClick={onClick}
                                component={Link}
                                to={{
                                    pathname: "/tenant/submission",
                                    state: item,
                                }}
                            />))}
                    </List>
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