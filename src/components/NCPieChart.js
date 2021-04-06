import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const NCPieChart = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [2,5,4,1,5,7,9,2,3],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.red[200],
          colors.yellow[300],
          colors.green[600],
          colors.grey[600],
          colors.pink[600],
          colors.brown[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['CGH', 'KKH', 'SGH', 'SKH', 'NCCS', 'NHCS', 'BVH', 'OCH', 'Academia']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'CGH',
      value: 2,
      // icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'KKH',
      value: 5,
      // icon: TabletIcon,
      color: colors.red[600]
    },
    {
      title: 'SGH',
      value: 4,
      // icon: PhoneIcon,
      color: colors.orange[600]
    },
    {
      title: 'SKH',
      value: 1,
      // icon: TabletIcon,
      color: colors.red[200]
    },
    {
      title: 'NCCS',
      value: 5,
      // icon: TabletIcon,
      color: colors.yellow[300]
    },
    {
      title: 'NHCS',
      value: 7,
      // icon: TabletIcon,
      color: colors.green[600]
    },
    {
      title: 'SBVH',
      value: 9,
      // icon: TabletIcon,
      color: colors.grey[600]
    },
    {
      title: 'OCH',
      value: 2,
      // icon: TabletIcon,
      color: colors.pink[600]
    },
    {
      title: 'Academia',
      value: 3,
      // icon: TabletIcon,
      color: colors.brown[600]
    },
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Non-Compliance by Institutions" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            // icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
              margin="20px"
            >
              {/* <Icon color="action" /> */}
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

NCPieChart.propTypes = {
  className: PropTypes.string
};

export default NCPieChart;