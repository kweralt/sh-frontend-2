import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
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

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PendingUnresolved = ({data}) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data != null) {
      setOrders(data);
    }
  }, [data]);

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader title="PENDING AND UNRESOLVED" />
      <Divider />
      <PerfectScrollbar>
        {/* <Box minWidth={800}>
          
        </Box> */}
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Report Number
                </TableCell>
                <TableCell>
                  Outlet Id
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
                      Audit Date
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
                  key={order.reportid}
                >
                  <TableCell>
                    {order.reportid}
                  </TableCell>
                  <TableCell>
                    {order.outletid}
                  </TableCell>
                  <TableCell>
                    {order.reporteddate}
                    {/* {moment(order.reporteddate).format('YYYY-MM-DD')} */}
                  </TableCell>
                  <TableCell>
                    {order.isresolved ? (
                      <Chip
                        color="primary"
                        label="Pending Approval"
                        size="small"
                      />
                    ) : (
                      <Chip
                        color="default"
                        label="Unresolved"
                        size="small"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

// PendingUnresolved.propTypes = {
//   className: PropTypes.string
// };

export default PendingUnresolved;