import React from 'react';
import {
    ListItem,
    ListItemText,
    Chip,
} from "@material-ui/core";
import Controls from "../components/controls/Controls";

const FormItem = ({data, onClick}) => {
    // function ListItemLink(props) {
    //     return <ListItem button component="a" {...props} />;
    // }
    return (
        <ListItem button onClick={onClick}>
            <ListItemText primary={'Audited By: '+ data.auditor} 
            secondary={'Due: '+ data.deadline}/>
            <Chip label={data.phase} color='primary'/>
        </ListItem>
    )
}

export default FormItem
