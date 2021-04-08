import { useForm, Form } from "../components/useForm";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as reportServices from "../services/reportServices";
import ImageUploader from "react-images-upload";
import RadioGroup from "./controls/RadioGroup";

const useStyles = makeStyles((theme) => ({
  paper: {
    // margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  radioGroup: {
    backgroundColor: "white",
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0)
  }
}));

const responseObject = [
  { id: 0, title: "Y" },
  { id: 1, title: "N" },
  { id: 2, title: "NA" },
];

export default function ChecklistForm({ questions }) {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
  const [checklistQuestions, setChecklistQuestions] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      let result = await reportServices.submitChecklist(values);
      console.log(result);
    }
  };

  const createChecklistFields = () => {
    var checklistFields = [];

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
    // const name = e.target.name;
    // const value = e.target.value;
    // console.log(name, value);
    // console.log(values);
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
    let selected = new Object(responsesArray.find((element) => element.id === item));
    return selected.value;
  };

  useEffect(() => {
    console.log(checklistQuestions);
    if (questions !== null) {
      setChecklistQuestions(questions);
      setValues({
        checklistResponses: createChecklistFields(questions),
        files: []
      });
    }
  }, [questions]);

  if (questions.length > 0) {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
        <Typography variant="h4">Le Checklist of Tears</Typography>
        {questions.map((category) => (
          <Grid sm={12}>
            <Typography variant="h5">{category.category}</Typography>
            <Grid>
              {category.subcategories.map((subcategory) => (
                <Grid sm={12}>
                  <Typography variant="h6">
                    {subcategory !== null ? subcategory.subcategory : ""}
                  </Typography>
                  {subcategory !== null ? subcategory.questions.map((item) => {
                        return (
                          <div className={classes.radioGroup}>
                            <RadioGroup
                              name={item.id}
                              label={item.question}
                              value={getSelectValue(item.id)}
                              onChange={handleChecklistSelect}
                              items={responseObject}
                            />
                          </div>
                        );
                      }) : (
                    <div></div>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
        <ImageUploader
          label="Non-compliance images"
          withIcon={true}
          withPreview={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
          maxFileSize={5242880}
        />
        <Controls.Button type="submit" text="Submit" />
        </Grid>
      </Form>
    );
  } else {
    return <div />;
  }
}
