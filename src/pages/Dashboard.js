import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import PendingUnresolved from "../components/PendingUnresolved";
import ScoreGraph from "../components/ScoreGraph";
import PencentageUnresolved from "../components/PencentageUnresolved";
import NumberOfNC from "../components/NumberOfNC";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import * as dashboardServices from "../services/dashboardServices";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  console.log(data);
  console.log(sessionStorage);

  useEffect(() => {
    dashboardServices.getDashboardData().then((pageData) => {
      console.log(pageData);
      setData(pageData);
    });
  }, []);
  console.log(data);
  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title={"Audit Records for " + data.institution}
          icon={<SupervisorAccountTwoToneIcon fontSize="large" />}
        />
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <NumberOfNC monthlyData={data.ncCount} />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <PencentageUnresolved data={data.unresolvedNCs} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ScoreGraph dataObjects={data.monthlyScoresByType} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <PendingUnresolved data={data.nonComplianceRecords} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ContentWrapper>
  );
};

export default Dashboard;
