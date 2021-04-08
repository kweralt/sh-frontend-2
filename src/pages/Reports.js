import React, {useState } from "react";
import Survey from "material-survey/components/Survey";
import {makeStyles} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import ChecklistForm from "../components/ChecklistForm";
import Notification from "../components/Notification";
import * as reportServices from "../services/reportServices";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    //paddingTop: theme.spacing(3),
  },
  checklistSelect: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 0),
  },
  checklistForm: {
    // backgroundColor: "#f0f8ff",
    // backgroundColor: "white",
    // borderRadius: "15px",
    // border: "solid 1px",
    // borderColor: "#cccccc",
  }
}));

//TODO: Don't hardcode this pls
const checklistTypeOptions = [
  "F&B",
  "Non-F&B",
  "COVID Safe Management Compliance",
];

const Reports = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    messsage: "",
    type: "",
  })

  const handleChecklistTypeSelected = (answers) => {
    let selectedType = answers.checklistType;
    var selectedTypeIndex;

    //TODO: Figure out a better way to do this
    for (var i = 0; i < checklistTypeOptions.length; i++) {
      if (checklistTypeOptions[i] === selectedType) selectedTypeIndex = i + 1;
    };

    reportServices
      .getQuestions({ checklistType: selectedTypeIndex })
      .then((data) => {
        setQuestions(data);
        setNotify({
          isOpen: true,
          message: "Checklist type changed",
          type: "success"
        });
      })
      .catch((error) => {
        console.error(error);
        setQuestions([]);
        setNotify({
          isOpen: true,
          message: "Cannot open checklist",
          type: "error"
        });
      });
  };

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title="New Audit Report"
          subTitle=""
          icon={<AssignmentIcon fontSize="large" />}
        />
        <div className={classes.paper}>
        <Survey
            onFinish={handleChecklistTypeSelected}
            form={{
              questions: [
                {
                  name: "checklistType",
                  title: "Select Checklist Type",
                  type: "radiogroup",
                  choices: checklistTypeOptions,
                },
              ],
            }}
          />
        </div>
        <div className={classes.checklistForm}>
          <ChecklistForm questions={questions}/>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </ContentWrapper>
  );
};

export default Reports;
