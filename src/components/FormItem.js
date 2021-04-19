import React from 'react';
import {
    ListItem,
    ListItemText,
    Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import Controls from "../components/controls/Controls";

const FormItem = ({data, onClick}) => {
    return (
        <ListItem button 
        onClick={onClick}
        component={Link}
        to={{
            pathname: "/tenant/submission",
            state: data,
        }}
        >
            <ListItemText primary={'Audited By: '+ data.auditor} 
            secondary={'Due: '+ data.deadline}/>
            <Chip label={data.phase} color='primary'/>
        </ListItem>
    )
}

export default FormItem
