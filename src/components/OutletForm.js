import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect } from "react";

const initialFormValues = {
    institution: "",
    outletName: "",
    tenantEmail: "",
    tenancyStart: new Date(),
    tenancyEnd: new Date()
};

export default function OutletForm(props) {
    const { addOrEdit, recordForEdit } = props;

    const validInputs = (fieldValues = values) => {
        let temp = {...errors};

        // TODO: Finish input validation
        if ("institution" in fieldValues) {
            temp.institution = fieldValues.institution ? "" : "This field is required";
        }
        if ("outletName" in fieldValues) {
            temp.outletName = fieldValues.outletName ? "" : "This field is required";
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

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="institution"
                        label="Institution"
                        value={values.institution}
                        onChange={handleInputChange}
                        error={errors.institution}
                    />
                    <Controls.Input
                        name="outletName"
                        label="Outlet Name"
                        value={values.outletName}
                        onChange={handleInputChange}
                        error={errors.outletName}
                    />
                    <Controls.Input
                        name="tenantEmail"
                        label="Tenant Email"
                        value={values.tenantEmail}
                        onChange={handleInputChange}
                        error={errors.tenantEmail}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.DatePicker
                        name="tenancyStart"
                        label="Tenancy Start"
                        value={values.tenancyStart}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="tenancyEnd"
                        label="Tenancy End"
                        value={values.tenancyEnd}
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