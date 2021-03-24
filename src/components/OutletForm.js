import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect } from "react";

const initialFormValues = {
    institutionname: "",
    outletname: "",
    email: "",
    tenancystart: new Date(),
    tenancyend: new Date()
};

export default function OutletForm(props) {
    const { addOrEdit, recordForEdit } = props;

    console.log(recordForEdit);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validInputs()) {
            console.log("Valid form");
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
                <Grid item xs={6}>
                    <Controls.Input
                        name="institutionname"
                        label="institutionname"
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
                        name="email"
                        label="Tenant Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={6}>
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
                    <div>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button text="Reset" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );


}