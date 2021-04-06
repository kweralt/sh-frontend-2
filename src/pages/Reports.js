import React from "react";
import Survey from "material-survey/components/Survey"
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import ContentWrapper from "../components/ContentWrapper";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Reports = () => {
  const classes = useStyles();

  return (
    <ContentWrapper>
      <div className={classes.root}>
      <Survey
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
      
      />
      </div>
    </ContentWrapper>
  )
}

export default Reports
