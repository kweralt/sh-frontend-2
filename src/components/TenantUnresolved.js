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
    createdAt: 1555016400000,
    resolveBy: 1555016400000 + 5000000,
    status: 'Pending'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1048',
    createdAt: 1555016400000,
    resolveBy: 1555016400000 + 5000000,
    status: 'Unresolved'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1047',
    createdAt: 1554930000000,
    resolveBy: 1555016400000 + 5000000,
    status: 'Unresolved'
  },
  {
    id: uuid(),
    reportNumber: 'CDD1046',
    createdAt: 1554757200000,
    resolveBy: 1555016400000 + 5000000,
    status: 'Unresolved'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TenantUnresolved = ({ className, ...rest }) => {
  const classes = useStyles();
  const [nc] = useState(data);

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
                  Non-Compliance ID
                </TableCell>
                <TableCell>
                  Report ID
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
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Resolve By
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Is Resolved?
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {nc.map((nc) => (
                    <TableRow
                    hover
                    key={nc.id}
                    >
                    <TableCell>
                        {nc.id}
                    </TableCell>
                    <TableCell>
                        {nc.reportNumber}
                    </TableCell>
                    <TableCell>
                        {moment(nc.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                        {moment(nc.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                        <Chip
                        color="primary"
                        label={nc.status}
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

TenantUnresolved.propTypes = {
  className: PropTypes.string
};

export default TenantUnresolved;