import { makeStyles, Grid, Avatar, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";
import logo from '../assets/singhealth_logo.png';
import * as reqs from "../requests/requests";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(8, 8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "15%",
    height: "15%",
    marginBottom: theme.spacing(3)
  },
  form: {
    width: "100%", // IE 11
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    maxWidth: "500px", //TODO: Figure out best width for the input fields
    minWidth: "250px",
    // margin: theme.spacing(2, 2, 2)
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
  const url = reqs.createUrl("/auth");
  return await fetch(url, reqs.generateRequestData("POST", credentials))
  .then((data) => data.json())
  .catch((err) => console.error(err));
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
      // console.log("testing");
      const responseData = await loginUser(values);
      localStorage.setItem("userId", responseData.user.id);
      setToken(responseData);
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.paper}>
        <img className={classes.logo} src={logo}/>
        <Typography variant="h5">
          Auditing Platform and Retail Service Management
        </Typography>

      </Grid>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h6">
          Sign In
        </Typography>
        <Controls.Input className={classes.input}
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
        <Controls.Input className={classes.input}
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
