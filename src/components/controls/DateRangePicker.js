import {
    FormHelperText,
    FormControl,
    FormControlLabel,
    FormLabel,
  } from "@material-ui/core";
import {DateRangePicker, DateRange} from "@matharumanpreet00/react-daterange-picker";
import { useState } from "react";

export default function DaterangePicker(props) {
    const {name, label, value, onChange} = props;
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState({});

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <DateRangePicker
                open={open}
                onChange={range => setDateRange(range)}
            />
        </FormControl>

    );
}