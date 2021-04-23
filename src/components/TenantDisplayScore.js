import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TenantDisplayScore = ({displayScore}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
      
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              LATEST SCORE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              97%
            </Typography>
          </Grid>
          
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={97}
            variant="determinate"
          />
        </Box>
        
      </CardContent>
    </Card>
  );
};

TenantDisplayScore.propTypes = {
  className: PropTypes.string
};

export default TenantDisplayScore;