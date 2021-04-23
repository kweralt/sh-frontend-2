import {useEffect, useState} from "react";
import {
    makeStyles,
    Paper,
    List,
    Typography,
} from "@material-ui/core";
import {
    CallToAction,
} from "@material-ui/icons";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import FormItem from "../components/FormItem";
import { Link, useLocation } from "react-router-dom";
import * as rectificationServices from "../services/rectificationServices";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    subTitle: {
        paddingLeft: theme.spacing(4),
        "& .MuiTypography-subtitle2": {
            opacity: "0.6",
    }},
}));

export default function TenantActions(){
    const classes = useStyles();
    const [reports, setReports] = useState([]);
    const id = localStorage.getItem("userId");

    const getReports = async () => {
        const data = await rectificationServices.getUnresolvedNC(id);
        setReports(data.data);
    }

    useEffect(() => {
        getReports();
    }, []);


    return (
        <ContentWrapper>
            <div className={classes.root}>
                <PageHeader
                    title="Tenant Action Center"
                    subTitle="Non-compliance Rectification"
                    icon={<CallToAction fontSize="large" />}/>
                <Paper className={classes.pageContent}>
                    {reports.length > 0 ? (<List>
                        {reports.map((item) => (
                            <FormItem 
                                data={item}
                                key={item.reportId}
                                component={Link}
                                to={{
                                    pathname: "/tenants/submission",
                                    state: item.NonComplianceId,
                                }}
                            />))}
                    </List>) : 
                    <div className={classes.subTitle}>
                        <Typography variant="subtitle2" 
                        component="div"
                        align="center"
                        opacity="0.6">
                            You have no non-compliance to rectify. Well done!
                        </Typography>
                    </div>}
                </Paper>
            </div>
        </ContentWrapper>
    )
}
const tdata = [
    {
        "formId": 0,
        "deadline": "11-04-2021",
        "reportedOn": "06-04-2021",
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
        "reportedOn": "07-04-2021",
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
        "reportedOn": "08-04-2021",
        "auditor": "Brandon",
        "phase": "Rectification Needed",
        "content": {
            "safety": false,
            "health": true,
            "notes": "yuiop"
        }
    }
]