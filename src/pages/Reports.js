import React, { useEffect, useState } from "react";
import Survey from "material-survey/components/Survey"
import {
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PageHeader from "../components/PageHeader";
import ContentWrapper from "../components/ContentWrapper";
import ChecklistForm from "../components/ChecklistForm";
import ExportImage from '../components/ExportImage';
import * as reportServices from "../services/reportServices";
import _, { toArray } from "underscore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  // typeSurvey: {
  //   visibility: 'hidden'
  // }
}));

//TODO: Figure out how to dynamically set the checklist depending on the checklist type

const checklistTypeOptions = ["F&B", "Non-F&B", "COVID Safe Management Compliance"];

const renderChecklist = (checklistQuestions) => {
  if (checklistQuestions.length > 0) {
    return (
      <ChecklistForm questions={checklistQuestions}/>
    )
  } else {
    console.log("hi");
  }
}

const Reports = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  // const [selectChecklist, setSelectChecklist] = useState(true);

  const handleChecklistTypeSelected =  async (answers) => {
    let selectedType = answers.checklistType;
    var selectedTypeIndex;

    //TODO: Figure out a better way to do this
    for (var i = 0; i < checklistTypeOptions.length; i++) {
      if (checklistTypeOptions[i] === selectedType) selectedTypeIndex = i + 1;
    }

    await reportServices.getQuestions({checklistType: selectedTypeIndex})
    .then((data) => {
      console.log(data);
      setQuestions(data);
    })
    .catch((error) => {
      console.error(error);
    });
    // console.log(data);
    // setQuestions(toArray(data));
    // setSelectChecklist(false);
  }



  return (
    <ContentWrapper>
      <div className={classes.root}>
        <PageHeader
          title="New Audit Report"
          subTitle="hello"
          icon={<AssignmentIcon fontSize="large"/>}
        />
        <Survey
          onFinish={handleChecklistTypeSelected}
          form={{
            questions: [
              {
                name: "checklistType",
                title: "Checklist Type",
                type: "radiogroup",
                choices: checklistTypeOptions
              }
            ]
          }}
        />
        <Container>
          {renderChecklist(questions)}
        </Container>
      {/* <Survey
        form ={{
          questions: [
            {
              name: "psh-qn1",
              title: "Shop is open and ready to service patients/visitors according to operating hours.",
              type: "boolean",
            },
            {
              name: "psh-qn2",
              title: "Staff Attendance: adequate staff for peak and non-peak hours.",
              type: "boolean",
            },
            {
              name: "psh-qn3",
              title: "At least one (1) clearly assigned person in-charge on site.",
              type: "boolean",
            },
            {
              name: "psh-qn4",
              title: "Staff who are unfit for work due to illness should not report to work).",
              type: "boolean",
            },
            {
              name: "psh-qn5",
              title: "Staff who are fit for work but suffering from the lingering effects of a cough and/or cold should cover their mouths with a surgical mask.",
              type: "boolean",
            },
            {
              name: "psh-qn6",
              title: "Clean clothes/uniform or aprons are worn during food preparation and food service.",
              type: "boolean",
            },
            {
              name: "psh-qn7",
              title: "Hair is kept tidy (long hair must be tied up) and covered with clean caps or hair nets where appropriate.",
              type: "boolean",
            },
            {
              name: "psh-qn8",
              title: "Sores, wounds or cuts on hands, if any, are covered with waterproof and brightly-coloured plaster.",
              type: "boolean",
            },
            {
              name: "psh-qn9",
              title: "Hands are washed thoroughly with soap and water, frequently and at appropriate times.",
              type: "boolean",
            },
            {
              name: "psh-qn10",
              title: "Fingernails are short, clean, unpolished and without nail accessories.",
              type: "boolean",
            },
            {
              name: "psh-qn11",
              title: "Food is handled with clean utensils and gloves.",
              type: "boolean",
            },
            {
              name: "psh-qn12",
              title: "Disposable gloves are changed regularly and/ or in between tasks.",
              type: "boolean",
            },
            {
              name: "psh-qn13",
              title: "",
              type: "boolean",
            },
          ]
        }}
        onFinish={(formData) => {
          console.log(formData);
        }}
      /> */}
      {/* <ExportImage/> */}
      </div>
    </ContentWrapper>
  )
}

export default Reports;