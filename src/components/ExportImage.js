import React, { useState } from "react";
import ImageUploader from "react-images-upload";

async function uploadImages(imageFiles) {
  const data = new FormData();
  for (const file of imageFiles) {
    data.append("files[]", file, file.name);
  }
  // post with fetch to api upload endpoint
  // return fetch("http://localhost:8080/endpoint", {
  //   mode: "cors",
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: data,
  // });
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
      <button onClick={handleSubmit}>Upload</button>
    </form>
  );
}
