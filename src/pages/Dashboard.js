import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  PeopleOutlineTwoTone,
} from "@material-ui/icons";
import PendingUnresolved from '../components/PendingUnresolved';
import ScoreGraph from '../components/ScoreGraph';
import PencentageUnresolved from '../components/PencentageUnresolved';
import NumberOfNC from '../components/NumberOfNC';
import NCPieChart from '../components/NCPieChart';
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title="Administrative Dashboard"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
        />
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <NumberOfNC />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={12}
          >
            <PencentageUnresolved />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <ScoreGraph />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <NCPieChart />
          </Grid>
          
          
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <PendingUnresolved />
          </Grid>
        </Grid>
      </Container>
      </div>
      </ContentWrapper>
  );
};

export default Dashboard;