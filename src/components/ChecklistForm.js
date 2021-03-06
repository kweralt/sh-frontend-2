import { useForm, Form } from "../components/useForm";
import { Grid, Typography, makeStyles, TextField } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as reportServices from "../services/reportServices";
import ImageUploader from "react-images-upload";
import RadioGroup from "./controls/RadioGroup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import computeScore from "../utils/scoreComputation";

const responseObject = [
  { id: 0, title: "Yes" },
  { id: 1, title: "No" },
  { id: 2, title: "NA" },
];

const imageExtensions = [".jpg", ".jpeg", ".gif", ".png"];
const passingScore = 95;

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(4),
  },
  radioGroup: {
    backgroundColor: "white",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    borderRadius: "15px",
    border: "solid 1px",
    borderColor: "#cccccc",
  },
  inputField: {
    backgroundColor: "white",
    borderRadius: "15px",
    border: "solid 1px",
    borderColor: "#cccccc",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  imageUpload: {
    margin: theme.spacing(3, 0),
  },
  subSection: {
    padding: theme.spacing(2, 0, 0),
    margin: theme.spacing(3, 0),
  },
  weightageLabel: {
    fontStyle: "italic",
  },
  section: {
    margin: theme.spacing(5, 0),
  },
}));

export default function ChecklistForm({ questions, checklistType = 0 }) {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
  const [score, setScore] = useState(0);
  const [rectificationNeeded, setRectificationNeeded] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  };

  //TODO: Finish input validation
  const validateInputs = (checklistValues = values) => {
    return true;
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(null, false, validateInputs);

  const handleSubmit = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    if (validateInputs()) {
      reportServices
        .submitChecklist(values, pictures, checklistType)
        .then((result) => {
          console.log(result);
          // questions = [];
          setNotify({
            isOpen: true,
            message: "Submitted successfully",
            type: "success",
          });
        })
        .catch((err) => console.error(err));
    }
  };
  const handleClearChecklist = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    questions = [];
    checklistType = 0;
    // setValues(null);
  };

  const createChecklistFields = () => {
    let data = [];

questions.forEach((category) => {
      data.push({
        categoryName: category.category,
        weightage: category.weightage,
        questions: [],
      });
      category.subcategories.forEach((subcategory) => {
        if (subcategory !== null) {
          var lastItemIndex = data.length - 1;
          subcategory.questions.forEach((item) => {
            data[lastItemIndex].questions.push(item);
          });
        }
      });
    });

    return data;
  };

  const findAndReplace = (objectArray, selectedId, value) => {
    objectArray.forEach((category) => {
      category.questions.forEach((question) => {
        if (question.id === selectedId) {
          question.value = value;
        }
      });
    });
    return objectArray;
  };

  const handleChecklistSelect = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      checklistResponses: findAndReplace(
        values.checklistResponses,
        parseInt(name),
        value
      ),
    });
    let newScore = computeScore(values.checklistResponses);
    setScore(newScore);
    setRectificationNeeded(newScore < passingScore)
    if (newScore >= passingScore) {
      setValues({
        ...values,
        resolveBy: ""
      });
    };
  };

  const getSelectValue = (itemId) => {
    if (values === null) return "";
    var responsesArray = values.checklistResponses;

    var newValue = "";

    //TODO: Find a faster way to update the selected value
    responsesArray.forEach((category) => {
      category.questions.forEach((question) => {
        if (question.id === itemId) newValue = question.value;
      });
    });

    return newValue;
  };

  useEffect(() => {
    if (questions !== null) {
      setValues({
        tenantid: "",
        checklistResponses: createChecklistFields(questions),
        files: [],
        resolveBy: "",
      });
    }
  }, [questions]);

  if (questions.length > 0) {
    return (
      <Form>
        <div className={classes.form}>
          <Typography variant="h4">Checklist for Audit Report</Typography>
          <div className={classes.section}>
            <Typography variant="h5">Section: Tenant Information</Typography>
            <div className={classes.inputField}>
              <Typography variant="body1">
                Enter ID of retail tenant to be audited
              </Typography>
              <TextField
                required
                name="tenantid"
                variant="standard"
                value={values.tenantid}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {questions.map((category) => (
            <div className={classes.section}>
              <Typography variant="h5">Section: {category.category}</Typography>
              <Typography variant="body1" className={classes.weightageLabel}>
                Weightage: {category.weightage}
              </Typography>
              <div>
                {category.subcategories.map((subcategory) => (
                  <div className={classes.subSection}>
                    <Typography variant="h6" component="div">
                      {subcategory !== null ? subcategory.subcategory : ""}
                    </Typography>
                    {subcategory !== null ? (
                      subcategory.questions.map((item) => {
                        return (
                          <div className={classes.radioGroup}>
                            <RadioGroup
                              name={item.id}
                              label={item.question}
                              value={getSelectValue(item.id)}
                              onChange={handleChecklistSelect}
                              items={responseObject}
                              // row={false}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={classes.section}>
            <Typography variant="h5">Section: Comments</Typography>
            <div className={classes.inputField}>
              <Typography variant="body1">Additional Comments</Typography>
              <TextField
                name="comments"
                id="outlined-multiline-static"
                multiline
                rowsMax={10}
                variant="standard"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={classes.section}>
            <Typography variant="h5">
              Section: Photos of Non-Compliances
            </Typography>
            <ImageUploader
              label="Non-compliance images"
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={imageExtensions}
              maxFileSize={5242880}
            />
          </div>
          <div className={classes.section}>
            <Typography variant="h5">
              Section: Rectification Deadline
            </Typography>
            <div className={classes.inputField}>
              <Typography variant="h6">Total score: {score} %</Typography>
              {rectificationNeeded ? (
                <Controls.DatePicker
                  name="resolveBy"
                  label="To be resolved By"
                  value={values.resolveBy}
                  onChange={handleInputChange}
                />
              ) : (
                <Typography variant="body1">
                  No rectification required.
                </Typography>
              )}
            </div>
          </div>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Controls.Button
              color="primary"
              text="Submit"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to submit this report?",
                  subTitle: "",
                  onConfirm: () => {
                    handleSubmit();
                  },
                });
              }}
            />
            <Controls.Button
              color="default"
              text="Clear"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to clear this checklist?",
                  subTitle: "Like really really sure?",
                  onConfirm: () => {
                    handleClearChecklist();
                  },
                });
              }}
            />
          </Grid>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </div>
      </Form>
    );
  } else {
    return <div />;
  }
}
