import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    reportNumber: 'CDD1049',
    customer: {
      name: 'Coffee Bean'
    },
    createdAt: 1555016400000,
    status: 'Pending'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1048',
    customer: {
      name: 'Starbucks'
    },
    createdAt: 1555016400000,
    status: 'Unresolved'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1047',
    customer: {
      name: 'Mr Bean'
    },
    createdAt: 1554930000000,
    status: 'Unresolved'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1046',
    customer: {
      name: 'Florist 101'
    },
    createdAt: 1554757200000,
    status: 'Unresolved'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1045',
    customer: {
      name: 'Hello World'
    },
    createdAt: 1554670800000,
    status: 'Pending'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1044',
    customer: {
      name: 'Lorem Ipsum'
    },
    createdAt: 1554670800000,
    status: 'Unresolved'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PendingUnresolved = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="PENDING AND UNRESOLVED" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Report Number
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.reportNumber}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.status}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

PendingUnresolved.propTypes = {
  className: PropTypes.string
};

export default PendingUnresolved;