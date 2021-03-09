import { PeopleOutlineTwoTone } from "@material-ui/icons";
import TenantForm from "../components/TenantForm";
import PageHeader from "../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { useState } from "react";
import useTable from "../components/useTable";
import * as tenantServices from "../services/tenantServices";
import Controls from "../components/controls/Controls";
import { Search, Add } from "@material-ui/icons";
import Popup from "../components/Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Tenant Name" },
  { id: "email", label: "Email Address" },
  { id: "mobile", label: "Phone Number" },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Tenants() {
  const classes = useStyles();
  const [records, setRecords] = useState(tenantServices.getAllTenants());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (tenant, resetForm) => {
    tenantServices.insertTenant(tenant);
    resetForm();
    setOpenPopup(false);
    setRecords(tenantServices.getAllTenants());
  };

  return (
    <>
      <PageHeader
        title="New Tenant"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Tenants"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<Add />}
            className={classes.newButton}
            onClick={() => setOpenPopup(true)}
          />
        </Toolbar>
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
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add New Tenant"
      >
        <TenantForm addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
