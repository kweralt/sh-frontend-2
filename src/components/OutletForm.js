import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as directoryServices from "../services/directoryServices";
import dateRangeValidation from "../utils/dateRangeValidation";
import Notification from "../components/Notification";
import _ from "underscore";

const initialFormValues = {
  outletname: "",
  outlettypeid: "",
  tenantid: "",
  unitnumber: "",
  tenancystart: new Date(),
  tenancyend: new Date(),
};

const changeJSONKeys = (vals) => {
  const data = [];
  const prevKeys = _.keys(vals[0]);
  for (let index = 0; index < vals.length; index++) {
    var item = vals[index];
    data[index] = {
      id: item[prevKeys[0]],
      title: item[prevKeys[1]],
    };
  }
  return data;
};

export default function OutletForm(props) {
  const { addOrEdit, recordForEdit, institutionInfo } = props;
  const [outletTypes, setOutletTypes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validInputs = (fieldValues = values) => {
    let temp = { ...errors };

    if ("outletname" in fieldValues) {
      temp.outletname = fieldValues.outletname
        ? initialFormValues.outletname
        : "This field is required";
    }
    if ("unitnumber" in fieldValues) {
      temp.unitnumber = fieldValues.unitnumber
        ? initialFormValues.unitnumber
        : "This field is required";
    }
    if ("tenantid" in fieldValues) {
      temp.tenantid = isNaN(fieldValues.tenantid)
        ? "Must be a numeric value"
        : initialFormValues.tenantid;
    }
    if ("outlettype" in fieldValues) {
      temp.outlettypeid = fieldValues.outlettypeid
        ? initialFormValues.outlettypeid
        : "This field is required";
    }
    if ("tenancystart" in fieldValues && "tenancyend" in fieldValues) {
      let validDateRange = dateRangeValidation(
        fieldValues.tenancystart,
        fieldValues.tenancyend
      );
      temp.tenancystart = validDateRange ? "" : "Invalid date range";
      temp.tenancyend = validDateRange ? "" : "Invalid date range";
    }

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "" || x === null);
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFormValues, false, validInputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInputs()) {
      var result;
      if ("outletid" in values) {
        result = await directoryServices.updateOutlet(values);
      } else {
        result = await directoryServices.addOutlet(values, institutionInfo.id);
      }
      console.log(result);
      if (result.status === 200) {
        addOrEdit(values, resetForm);
      } else {
        setNotify({
          isOpen: true,
          message: result.error,
          type: "error",
        });
      }
    } else {
      setNotify({
        isOpen: true,
        message: "Invalid fields",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const getOutletTypes = async () => {
      const data = await directoryServices.getOutletTypes();
      const typesData = changeJSONKeys(data.data);
      setOutletTypes(typesData);
    };
    getOutletTypes();
    console.log(recordForEdit);
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
            name="tenantid"
            label="Tenant Id"
            value={values.tenantid}
            onChange={handleInputChange}
            error={errors.tenantid}
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
            <Controls.Button type="submit" text="Submit" name="submit" />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm}
              name="reset"
            />
          </div>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </Form>
  );
}
