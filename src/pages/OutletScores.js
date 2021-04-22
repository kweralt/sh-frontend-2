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
import { ArrowBack, GetAppOutlined, EmailOutlined } from "@material-ui/icons";
import Controls from "../components/controls/Controls";
import useTable from "../components/useTable";
import PageHeader from "../components/PageHeader";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { Link, useLocation } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import * as dashboardServices from "../services/dashboardServices";
import { Form } from "../components/useForm";
import Button from "@material-ui/core/Button";

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
  },
  formContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
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
  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedDate);
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
          </IconButton>
          <Typography variant="body2">Back to dashboard</Typography>
        </Grid>
        <PageHeader
          title="View audit scores"
          subTitle="View by month and year"
          icon={<AssessmentIcon />}
        />
        <Paper>
          <Toolbar>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                openTo="year"
                views={["year", "month"]}
                onChange={handleDateChange}
                value={selectedDate}
              />
            </MuiPickersUtilsProvider>
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
                    <Controls.ActionButton color="primary">
                      <GetAppOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton color="secondary">
                      <EmailOutlined fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TblPagination />
          </TblContainer>
        </Paper>
      </div>
    </ContentWrapper>
  );
}
