import { useForm, Form } from "../components/useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import * as tenantServices from "../services/tenantServices";
import { useEffect } from "react";

const initialFValues = {
  // id: 0,
  UserName: "",
  Email: "",
  Password: ""
};

export default function TenantForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validInputs = (fieldValues = values) => {
    // only update based on properties below
    let temp = { ...errors };

    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "This field is required.";
    if ("Email" in fieldValues)
      temp.Email = /$^|.+@.+..+/.test(fieldValues.Email) // TODO: Check for empty email input
        ? ""
        : "Email is not valid."; // regex for Email
    if ("Password" in fieldValues && recordForEdit === null)
      temp.Password = fieldValues.Password ? "" : "This field is required";
    setErrors({
      ...temp,
    });

    // every() returns true if all elements pass test
    return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validInputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInputs()) {
      if ('UserId' in values) {
        console.log("Update user with id " + values.UserId);
        await tenantServices.updateTenant(values);
      } else {
        console.log("Add new user");
        let result = await tenantServices.addTenant(values);
        console.log(result);
      }
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]); // when recordForEdit changed, callback {setValues} invoked to populate form with current row details

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            name="UserName"
            label="Full Name"
            value={values.UserName}
            onChange={handleInputChange}
            error={errors.UserName}
          />
          <Controls.Input
            label="Email"
            name="Email"
            value={values.Email}
            onChange={handleInputChange}
            error={errors.Email}
          />
          <Controls.Input
            label="Password (Optional)"
            name="Password"
            value={values.Password}
            onChange={handleInputChange}
            error={errors.Password}
          />
          <div>
            <Controls.Button type="submit" text="Submit" id="submitform"/>
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
