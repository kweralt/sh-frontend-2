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
import { useEffect, useState } from "react";
import useTable from "../components/useTable";
import * as tenantServices from "../services/tenantServices";
import Controls from "../components/controls/Controls";
import {
  Search,
  Add,
  Close,
  EditOutlined,
  PeopleOutlineTwoTone,
} from "@material-ui/icons";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import ContentWrapper from "../components/ContentWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: "TenantId", label: "Tenant Id" },
  { id: "name", label: "Tenant Name" },
  { id: "email", label: "Email Address" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Tenants() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    messsage: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [institutionInfo, setInstitutionInfo] = useState({});

  const getRecords = () => {
    tenantServices.getTenants().then((data) => {
      console.log(data);
      setRecords(data.tenantRecords);
      setInstitutionInfo(data.institutionInfo);
    });
  };

  useEffect(() => {
    getRecords();
  }, []);

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
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const addOrEdit = (tenant, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    getRecords();
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    tenantServices.deleteTenant(id);
    getRecords();
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title={"Tenants in " + institutionInfo.name}
          subTitle="Form design with validation"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              id="searchtenants"
              label="Search Tenants"
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
              id="addtenants"
              text="Add New Tenant"
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.TenantId}>
                  <TableCell>{item.TenantId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.Email}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Do you really want to delete this record",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.UserId);
                          },
                        });
                      }}
                    >
                      <Close fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TblPagination />
          </TblContainer>
        </Paper>
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title={"Tenant Form"}
        >
          <TenantForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
    </ContentWrapper>
  );
}
