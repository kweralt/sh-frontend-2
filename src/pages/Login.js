import { makeStyles, Grid, Avatar, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // IE 11
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFValues = {
  email: "",
  password: "",
};

// take credentials as arg, fetch() with POST method, return format {token: 'test123'}
async function loginUser(credentials) {
  return fetch("http://localhost:8080/auth", {
    mode: "cors",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    // only update based on properties below
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid."; // regex for email
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 2 ? "" : "Minimum 3 characters required.";
    setErrors({
      ...temp,
    });

    // every() returns true if all elements pass test
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("testing");
      const token = await loginUser(values);
      setToken(token);
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
      </Grid>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Controls.Input
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Controls.Input
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoComplete="current-password"
          autoFocus
          values={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Controls.Button
          className={classes.submit}
          type="submit"
          text="Sign In"
          name="btnK"
        />
        {/* <Link href="#" variant="body2">
          Forgot password?
        </Link> */}
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
