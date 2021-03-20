import { makeStyles, Paper } from "@material-ui/core";
import { PeopleOutlineTwoTone } from "@material-ui/icons";
import PageHeader from "../components/PageHeader";
import LoginForm from "../components/LoginForm";
import ContentWrapper from "../components/ContentWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // IE 11
    marginTop: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <PageHeader
            title="Login"
            subTitle="Welcome to SingHealth Retail Audit App"
            icon={<PeopleOutlineTwoTone fontSize="large" />}
          />
          <LoginForm className={classes.form} />
        </Paper>
      </div>
    </ContentWrapper>
  );
}
