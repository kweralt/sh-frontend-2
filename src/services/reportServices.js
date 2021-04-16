import * as reqs from "../requests/requests";

export async function getQuestions(values) {
  const url = reqs.createUrl("/report/questions/get");
  return await fetch(url, reqs.generateRequestData("POST", values)).then(
    (response) => {
      return response.json();
    }
  );
}

export async function submitChecklist(values) {
  // console.log(values.images);
  const url = reqs.createUrl("/report/image/upload/multiple");

  var form = new FormData();

  form.append("checklistResponses", values.checklistResponses);
  form.append("date", new Date());
  form.append("auditorId", localStorage.getItem("userId"));

  for (var i = 0; i < values.images.length; i++) {
    form.append("images", values.images[i]);
  }

  return await fetch(url, reqs.generateFormRequestData(form)).then(
    (response) => response.status
  );
}
