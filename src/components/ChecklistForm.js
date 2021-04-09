import { useForm, Form } from "../components/useForm";
import { Grid, Typography, makeStyles, TextField } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as reportServices from "../services/reportServices";
import ImageUploader from "react-images-upload";
import RadioGroup from "./controls/RadioGroup";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";

const responseObject = [
  { id: 0, title: "Yes" },
  { id: 1, title: "No" },
  { id: 2, title: "NA" },
];

const imageExtensions = [".jpg", ".jpeg", ".gif", ".png"];

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(2),
    margin: theme.spacing(4),
  },
  radioGroup: {
    backgroundColor: "white",
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0),
    borderRadius: "15px",
    border: "solid 1px",
    borderColor: "#cccccc",
  },
  inputField: {
    backgroundColor: "white",
    borderRadius: "15px",
    border: "solid 1px",
    borderColor: "#cccccc",
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 0),
  },
  imageUpload: {
    margin: theme.spacing(3, 0),
  },
  subSection: {
    padding: theme.spacing(2, 0, 0),
  },
  weightageLabel: {
    fontStyle: "italic",
  },
}));

export default function ChecklistForm({ questions }) {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
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
    setPictures([...pictures, picture]);
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
    // e.preventDefault()
    console.log(values);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    if (validateInputs()) {
      reportServices
        .submitChecklist(values)
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
      isOpen: false
    });
    questions = [];
    // setValues(null);
  };

  const createChecklistFields = () => {
    var checklistFields = [];
    var data = questions;

    data.map((category) => {
      category.subcategories.map((subcategory) => {
        if (subcategory !== null) {
          subcategory.questions.map((item) => item["value"] = "");
        }
      })
    });

    console.log(data);

    questions.map((category) =>
      category.subcategories.map((subcategory) => {
        if (subcategory !== null) {
          subcategory.questions.map((item) => {
            checklistFields.push({
              id: item.id,
              value: "",
            });
          });
        }
      })
    );

    return checklistFields;
  };

  const findAndReplace = (objectArray, id, value) => {
    var elementToChange = objectArray.find((element) => element.id === id);
    elementToChange.value = value;
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
  };

  const getSelectValue = (item) => {
    if (values === null) return "";
    var responsesArray = values.checklistResponses;

    //TODO: Find a faster way to update the selected value
    let selected = new Object(
      responsesArray.find((element) => element.id === item)
    );
    return selected.value;
  };

  useEffect(() => {
    if (questions !== null) {
      setValues({
        tenantid: "",
        checklistResponses: createChecklistFields(questions),
        files: [],
      });
    }
  }, [questions]);

  if (questions.length > 0) {
    return (
      <Form>
        <div className={classes.form}>
          <Typography variant="h4">Le Checklist of Tears</Typography>
          <div className={classes.inputField}>
            <Typography variant="body1">
              Enter ID of tenant to be audited
            </Typography>
            <TextField
              required
              name="tenantid"
              variant="standard"
              value={values.tenantid}
              onChange={handleInputChange}
            />
          </div>
          {questions.map((category) => (
            <Grid sm={12}>
              <Typography variant="h5">{category.category}</Typography>
              <Typography variant="body1" className={classes.weightageLabel}>Weightage: {category.weightage}</Typography>
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
                              row={false}
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
            </Grid>
          ))}
          <div>
            <Typography variant="h5">Photos of Non-Compliances</Typography>
            <ImageUploader
              label="Non-compliance images"
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={imageExtensions}
              maxFileSize={5242880}
            />
          </div>
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
                }
               })
            }}
          />
          <Controls.BackToTopButton/>
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
