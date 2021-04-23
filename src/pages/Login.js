import { makeStyles, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useState } from "react";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";
import logo from "../assets/singhealth_logo.png";
import Notification from "../components/Notification";
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
    width: "75px",
    height: "75px",
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%", // IE 11
    margin: theme.spacing(1, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    maxWidth: "500px",
    minWidth: "250px",
    margin: theme.spacing(2, 4),
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
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.error(err));
}

export default function Login({ setToken }) {
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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
      await loginUser(values)
        .then((data) => {
          if (data.status === 200) {
            // console.log(data.user);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("roleId", data.user.role);
            localStorage.setItem("userName", data.user.name);
            setToken(data);
            window.location.replace("http://localhost:3000/dashboard");
          } else {
            setNotify({
              isOpen: true,
              message: data.error,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setNotify({
            isOpen: true,
            message: "Error logging in",
            type: "error",
          });
        });
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.paper}>
        <img className={classes.logo} src={logo} />
        <Typography variant="h5" align="center">
          Auditing Platform and Retail Service Management
        </Typography>
      </Grid>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h6">Sign In</Typography>
        <div className={classes.input}>
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
        </div>
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
        <Notification notify={notify} setNotify={setNotify} />
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
