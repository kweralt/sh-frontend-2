import React, { useEffect, useState } from "react";
import Survey from "material-survey/components/Survey";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import ChecklistForm from "../components/ChecklistForm";
import RadioGroup from "../components/controls/RadioGroup";
import * as reportServices from "../services/reportServices";
import _, { toArray } from "underscore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  paper: {
    backgroundColor: "#e8ecff",
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

//TODO: Figure out how to dynamically set the checklist depending on the checklist type

const checklistTypeOptions = [
  "F&B",
  "Non-F&B",
  "COVID Safe Management Compliance",
];

const Reports = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [checklistType, setChecklistType] = useState(null);
  const [checklistChanged, setChecklistChanged] = useState(false);

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
        // console.log(data);
        setChecklistType(selectedTypeIndex);
        setQuestions(data);
      })
      .catch((error) => {
        console.error(error);
        setQuestions([]);
      });
  };

  // const toggleChecklist = () => {
  //   if (checklistType !== null && questions.length > 0) {
  //     return <ChecklistForm questions={questions} />;
  //   } else {
  //     return <div/>
  //   }
  // }

  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title="New Audit Report"
          subTitle="hello"
          icon={<AssignmentIcon fontSize="large" />}
        />
        <Paper className={classes.paper}>
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
        </Paper>
        <Container>
          {/* {toggleChecklist()} */}
          <ChecklistForm questions={questions}/>
        </Container>
      </div>
    </ContentWrapper>
  );
};

export default Reports;
