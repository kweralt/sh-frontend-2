import {
  makeStyles,
  Grid,
  Avatar,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
// import ContentWrapper from "../components/ContentWrapper";
import PropTypes from "prop-types";
import { useState } from "react";

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

// take credentials as arg, fetch() with POST method, return format {token: 'test123'}
async function loginUser(credentials) {
  // replace url here
  return fetch("http://localhost:3000/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
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
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
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
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          type="submit"
        >
          Sign In
        </Button>
        {/* <Link href="#" variant="body2">
          Forgot password?
        </Link> */}
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
