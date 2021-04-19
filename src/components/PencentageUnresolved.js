import React, { useEffect, useState } from 'react';
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

const PencentageUnresolved = ({ data }) => {
  const classes = useStyles();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (data != null) {
      let unresolvedPercent = parseFloat(data) * 100;
      setPercentage(unresolvedPercent.toFixed(1));
    }
    else setPercentage(0);
  }, [data]);

  return (
    <Card
      className={clsx(classes.root)}//, className)}
      // {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              PERCENTAGE UNRESOLVED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {percentage}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

// PencentageUnresolved.propTypes = {
//   className: PropTypes.string
// };

export default PencentageUnresolved;