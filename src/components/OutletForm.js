import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect } from "react";
import * as directoryServices from "../services/directoryServices";

const initialFormValues = {
    institutionname: "",
    outletname: "",
    email: "",
    unitnumber: "",
    tenancystart: new Date(),
    tenancyend: new Date()
};

export default function OutletForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validInputs = (fieldValues = values) => {
        let temp = {...errors};

        // TODO: Finish input validation
        if ("institutionname" in fieldValues) {
            temp.institutionname = fieldValues.institutionname ? "" : "This field is required";
        }
        if ("outletname" in fieldValues) {
            temp.outletname = fieldValues.outletname ? "" : "This field is required";
        }

        setErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, true, validInputs);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validInputs()) {
            if ('outletid' in values) {
                console.log("Update outlet");
                let result = await directoryServices.updateOutlet(values);
                console.log(result);
            } else {
                console.log("Add new outlet");
                let result = await directoryServices.addOutlet(values);
                console.log(result);
            }
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit,
            });
        }
    }, [recordForEdit]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Controls.Input
                        name="institutionname"
                        label="Institution"
                        value={values.institutionname}
                        onChange={handleInputChange}
                        error={errors.institutionname}
                    />
                    <Controls.Input
                        name="outletname"
                        label="Outlet Name"
                        value={values.outletname}
                        onChange={handleInputChange}
                        error={errors.outletname}
                    />
                    <Controls.Input
                        name="unitnumber"
                        label="Unit Number"
                        value={values.unitnumber}
                        onChange={handleInputChange}
                        error={errors.unitnumber}
                    />
                    <Controls.Input
                        name="email"
                        label="Tenant Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.DatePicker
                        name="tenancystart"
                        label="Tenancy Start"
                        value={values.tenancystart}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="tenancyend"
                        label="Tenancy End"
                        value={values.tenancyend}
                        onChange={handleInputChange}
                    />
                {/* <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>

                </Grid> */}
                <Grid item lg={12}>
                    <div>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button text="Reset" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );


}