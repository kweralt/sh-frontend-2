import { useForm, Form } from "./useForm";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
// import loginServices
// ?need useEffect to clear form when logout

const initialFValues = {
  email: "",
  password: "",
};

export default function LoginForm(props) {
  const { loggedIn, logout, login } = props;

  const validate = (fieldValues = values) => {
    // only update based on properties below
    let temp = { ...errors };

    // perform validation here

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
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // handle login submission here
    }
  };

  return (
    <Form>
      <Grid container>
        <Grid item xs={12} sm={8} md={5} direction="row" elevation={6} square>
          <Controls.Input name="email" label="Email" />
          <Controls.Input name="password" label="Password" type="password" />
          <Controls.Button type="submit" text="Login" />
        </Grid>
      </Grid>
    </Form>
  );
}
