import { PeopleOutlineTwoTone } from "@material-ui/icons";
import TenantForm from "../components/TenantForm";
import PageHeader from "../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useState } from "react";
import useTable from "../components/useTable";
import * as tenantServices from "../services/tenantServices";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: "fullName", label: "Tenant Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Phone Number" },
  { id: "department", label: "Department", disableSorting: true },
];

export default function Tenants() {
  const classes = useStyles();
  const [records, setRecords] = useState(tenantServices.getAllTenants());
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells);

  return (
    <>
      <PageHeader
        title="New Tenant"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <TenantForm />
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
