import { PeopleOutlineTwoTone } from "@material-ui/icons";
import TenantForm from "../components/TenantForm";
import PageHeader from "../components/PageHeader";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Tenants() {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="New Tenant"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <TenantForm />
      </Paper>
    </>
  );
}
