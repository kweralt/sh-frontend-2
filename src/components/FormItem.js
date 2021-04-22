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
            <ListItemText primary={'Audited By: '+ data.UserName} 
            secondary={'Reported On: '+ data.ReportedDate}/>
            <Chip label={'Due '+ data.ResolveByDate} color='secondary'/>
        </ListItem>
    )
}

export default FormItem
