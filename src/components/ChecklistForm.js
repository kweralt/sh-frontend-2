import { useForm, Form } from "../components/useForm";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useEffect, useState } from "react";
import * as reportServices from "../services/reportServices";
import ImageUploader from "react-images-upload";
import RadioGroupQuestion from "material-survey/components/RadiogroupQuestion";
// import from "mate"
import _ from "underscore";
import { QueueSharp } from "@material-ui/icons";

const responseOptions = ["Y", "N", "NA"];

export default function ChecklistForm({ questions }) {
  const [pictures, setPictures] = useState([]);

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

  return (
    <Form onSubmit={handleSubmit}>
      <Typography variant="h4">Le Checklist of Tears :)</Typography>
      {questions.map((category) => (
        <Grid>
          <Typography variant="h5">{category.category}</Typography>
          <Grid>
            {category.subcategories.map((subcategory) => (
              <Grid>
                <Typography variant="h6">
                  {subcategory !== null ? subcategory.subcategory : ""}
                </Typography>
                {subcategory !== null ? (
                  <Grid>
                    {subcategory.questions.map((item) => (
                      <RadioGroupQuestion
                        onChangeAnswer={(answer) => console.log(answer)}
                        question={{
                          choices: responseOptions,
                          name: item.id,
                          title: item.question,
                          type: "radiogroup",
                        }}
                      />
                    ))}
                  </Grid>
                ) : (
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
    </Form>
  );
}
