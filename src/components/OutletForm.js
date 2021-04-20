import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as directoryServices from "../services/directoryServices";
import dateRangeValidation from "../utils/dateRangeValidation";
import _ from "underscore";

const initialFormValues = {
    institutionid: "",
    outletname: "",
    outlettypeid: "",
    email: "",
    unitnumber: "",
    tenancystart: new Date(),
    tenancyend: new Date()
};

const changeJSONKeys = (vals) => {
    const data = [];
    const prevKeys = _.keys(vals[0]);
    for (let index = 0; index < vals.length; index++) {
        var item = vals[index];
        data[index] = {
            id: item[prevKeys[0]],
            title: item[prevKeys[1]]
        };
        
    }
    return data;
};

export default function OutletForm(props) {
    const { addOrEdit, recordForEdit } = props;
    const [institutions, setInstitutions] = useState([]);
    const [outletTypes, setOutletTypes] = useState([]);

    const validInputs = (fieldValues = values) => {
        let temp = {...errors};

        // console.log(fieldValues);

        if ("institutionid" in fieldValues) {
            temp.institutionid = fieldValues.institutionid ? initialFormValues.institutionid : "This field is required";
        }
        if ("outletname" in fieldValues) {
            temp.outletname = fieldValues.outletname ? initialFormValues.outletname : "This field is required";
        }
        if ("unitnumber" in fieldValues) {
            temp.unitnumber = fieldValues.unitnumber ? initialFormValues.unitnumber : "This field is required";
        }
        if ("email" in fieldValues) {
            temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? initialFormValues.email : "Invalid email";
        }
        if ("outlettype" in fieldValues) {
            temp.outlettypeid = fieldValues.outlettypeid ? initialFormValues.outlettypeid : "This field is required";
        }
        if (("tenancystart" in fieldValues) && ("tenancyend" in fieldValues)) {
            let validDateRange = dateRangeValidation(fieldValues.tenancystart, fieldValues.tenancyend);
            temp.tenancystart = validDateRange ? "" : "Invalid date range";
            temp.tenancyend = validDateRange ? "" : "Invalid date range";
        }

        setErrors({
            ...temp,
        });

        // console.log(temp);

        return Object.values(temp).every((x) => (x === "") || (x === null));
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFormValues, false, validInputs);

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
        } else {
            console.log("Something wrong");
        }
    };

    useEffect(() => {
        const getInstitutions = async () => {
            const data = await directoryServices.getInstitutions();
            const institutionData = changeJSONKeys(data.institutions);
            setInstitutions(institutionData);
        };
        // alert(localStorage.getItem("userId"));
        getInstitutions();

        const getOutletTypes = async () => {
            const data = await directoryServices.getOutletTypes();
            const typesData = changeJSONKeys(data.data);
            console.log(typesData);
            setOutletTypes(typesData);
        };
        getOutletTypes();
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit,
            });
        }
    }, [recordForEdit, setValues]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Select
                        name="institutionid"
                        label="Institution"
                        value={values.institutionid}
                        error={errors.institutionid}
                        onChange={handleInputChange}
                        options={institutions}
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
                </Grid>
                <Grid item sm={6}>
                    <Controls.RadioGroup
                        name="outlettypeid"
                        label="Outlet Type"
                        value={values.outlettypeid}
                        error={errors.outlettypeid}
                        onChange={handleInputChange}
                        items={outletTypes}
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
                </Grid>
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