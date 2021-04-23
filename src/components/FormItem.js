import React from 'react';
import {
    ListItem,
    ListItemText,
    Chip,
} from "@material-ui/core";

const FormItem = (props) => {
    const data = props.data;
    return (
        <ListItem button 
        component = {props.component}
        to = {props.to}
        >
            <ListItemText primary={'Audited By: '+ data.auditedby} 
            secondary={data.reporttype + ' Report'}/>
            <Chip label={'Due ' + data.deadline} color='primary'/>
        </ListItem>
    )
}

export default FormItem
