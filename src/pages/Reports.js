import React, {useEffect, useState } from "react";
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
}));

<<<<<<< HEAD
//TODO: Don't hardcode this pls
const checklistTypeOptions = [
  "F&B",
  "Non-F&B",
  "COVID Safe Management Compliance",
];



=======
>>>>>>> fc4ee3dbcdd0a486a7c64d3f4bd5fc2edee4bde3
const Reports = () => {
  const classes = useStyles();
  const [currentChecklistType, setCurrentChecklistType] = useState(0);
  const [checklistTypes, setChecklistTypes] = useState([]);
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
    for (var i = 0; i < checklistTypes.length; i++) {
      if (checklistTypes[i] === selectedType) selectedTypeIndex = i + 1;
    };

    reportServices
      .getQuestions(selectedTypeIndex)
      .then((data) => {
        setQuestions(data);
        setCurrentChecklistType(selectedTypeIndex);
        setNotify({
          isOpen: true,
          message: "Checklist type changed",
          type: "success"
        });
      })
      .catch((error) => {
        console.error(error);
        setQuestions([]);
        setCurrentChecklistType(0);
        setNotify({
          isOpen: true,
          message: "Cannot open checklist",
          type: "error"
        });
      });
  };

  useEffect(() => {
    reportServices.getChecklistTypes()
    .then((data) => {
      let checklistTypesArray = [];
      // console.log(data);

      data.forEach((type) => {
        checklistTypesArray.push(type.ChecklistName);
      })
      setChecklistTypes(checklistTypesArray);
    })
    .catch((err) => {
      console.error(err);
    })
  }, []);

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
                  choices: checklistTypes,
                },
              ],
            }}
          />
        </div>
        <div>
          <ChecklistForm questions={questions} checklistType={currentChecklistType}/>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </ContentWrapper>
  );
};

export default Reports;
