import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import Controls from "./controls/Controls";
import * as reqs from "../requests/requests";

//TODO: Add support for multiple image upload
async function uploadImages(imageFiles) {
  const data = new FormData();
  for (const file of imageFiles) {
    data.append("image", file);
  }

  const url = reqs.createUrl("/report/image/upload/test");
  const reqParams = reqs.generateFormRequestData(data);

  return await fetch(url, reqParams)
  .then((response) => console.log(response.status))
  .catch((er) => console.error(er));
}

export default function ExportImage(props) {
  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pictures[pictures.length - 1]);
    uploadImages(pictures[pictures.length - 1]);
  };

  return (
    <form>
      <ImageUploader
        {...props}
        withIcon={true}
        withPreview={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
      {/* <button onClick={handleSubmit}>Upload</button> */}
      <Controls.Button type="upload" text="upload" onClick={handleSubmit}/>
    </form>
  );
}
