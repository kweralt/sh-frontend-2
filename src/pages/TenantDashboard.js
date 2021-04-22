import React from 'react';
import { useEffect, useState } from "react";
import * as dashboardServices from "../services/dashboardServices";
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  PeopleOutlineTwoTone,
} from "@material-ui/icons";
import TenantScoreGraph from '../components/TenantScoreGraph';
import TenantNC from '../components/TenantNC';
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import TenantDisplayScore from '../components/TenantDisplayScore';
import TenantUnresolved from '../components/TenantUnresolved';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TenantDashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const pageData = await dashboardServices.getDashboardData();
      console.log(pageData);
      setData(pageData);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title={`Hello ` + localStorage.getItem("userName")}
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
              xs={6}
            >
              <TenantNC />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={6}
            >
              <TenantDisplayScore />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <TenantScoreGraph />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <TenantUnresolved />
            </Grid>
            
          </Grid>
        </Container>
      </div>
      </ContentWrapper>
  );
};

export default TenantDashboard;