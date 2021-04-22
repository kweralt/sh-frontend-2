import { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ContentWrapper from "../components/ContentWrapper";
import {
  ArrowBack,
  GetAppOutlined,
  EmailOutlined,
  Search,
} from "@material-ui/icons";
import Controls from "../components/controls/Controls";
import useTable from "../components/useTable";
import PageHeader from "../components/PageHeader";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import * as dashboardServices from "../services/dashboardServices";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import { Button } from "selenium-webdriver";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  datePicker: {
    maxWidth: "50%",
    marginTop: theme.spacing(2),
  },
  formContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  toolBar: {
    marginTop: theme.spacing(1),
  },
}));

const headCells = [
  { id: "reportid", label: "Report Id" },
  { id: "reporttype", label: "Report Type" },
  { id: "outletid", label: "Outlet Id" },
  { id: "outletname", label: "Outlet Name" },
  { id: "score", label: "Audit Score" },
  { id: "reportedon", label: "Reported On" },
  { id: "auditorid", label: "Auditor Id" },
  { id: "auditorname", label: "Auditor Name" },
  { id: "actions", label: "Actions" },
];

export default function OutletScores() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notify, setNotify] = useState({
    isOpen: false,
    messsage: "",
    type: "",
  });
  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      fn: (items) => {
        if (target.value === "") return items;
        else {
          return items.filter((x) =>
            x.outletid.toString().includes(target.value)
          );
        }
      },
    });
  };

  const handleExport = (reportId) => {
    dashboardServices.downloadExcelReport(reportId)
    .then((status) => {
      console.log(status);
      if (status === 200) {
        setNotify({
          isOpen: true,
          message: "Report downloaded successfully",
          type: "success"
        });
      } else {
        setNotify({
          isOpen: true,
          message: "Error downloading report",
          type: "error"
        })
      }
    });
  };

  const handleEmail = (reportId) => {
    console.log("Email report id ", reportId);
    dashboardServices.emailExcelReport(reportId)
    .then((status) => {
      console.log(status);
      if (status === 200) {
        setNotify({
          isOpen: true,
          message: "Report sent successfully",
          type: "success"
        });
      } else {
        setNotify({
          isOpen: true,
          message: "Error sending report",
          type: "error"
        });
      }
    })
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFunction);

  useEffect(() => {
    dashboardServices
      .getScoresTableData(selectedDate)
      .then((newRecords) => setRecords(newRecords));
  }, [selectedDate]);

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <IconButton component={Link} to="/dashboard">
            <ArrowBack fontSize="medium" />
            <Typography variant="body1">  Back to dashboard</Typography>
          </IconButton>
        </Grid>
        <PageHeader
          title="View audit scores"
          subTitle="View by month and year"
          icon={<AssessmentIcon />}
        />
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  openTo="year"
                  label="Select year and month to view records"
                  views={["year", "month"]}
                  onChange={handleDateChange}
                  value={selectedDate}
                />
              </MuiPickersUtilsProvider>
              <Controls.Input
                label="Filter by outlet Id"
                id="filtertext"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Grid>
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.reportid}>
                  <TableCell>{item.reportid}</TableCell>
                  <TableCell>{item.reporttype}</TableCell>
                  <TableCell>{item.outletid}</TableCell>
                  <TableCell>{item.outletname}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.reportedon}</TableCell>
                  <TableCell>{item.auditorid}</TableCell>
                  <TableCell>{item.auditorname}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        handleExport(item.reportid);
                      }}
                    >
                      <GetAppOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => handleEmail(item.reportid)}
                    >
                      <EmailOutlined fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TblPagination />
          </TblContainer>
        </Paper>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </ContentWrapper>
  );
}
