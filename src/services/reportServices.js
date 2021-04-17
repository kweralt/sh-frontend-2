import * as reqs from "../requests/requests";
import computeScore from "../utils/scoreComputation";

export async function getQuestions(values) {
  const url = reqs.createUrl("/report/questions/get");
  return await fetch(url, reqs.generateRequestData("POST", values)).then(
    (response) => {
      return response.json();
    }
  );
}

export async function submitChecklist(values) {
  const url = reqs.createUrl("/report/image/upload/multiple");

  var form = new FormData();

  let score = computeScore(values.report.checklistResponses);
  // console.log(score);

  form.append("checklistResponses", JSON.stringify(values.report));
  form.append("score", score);
  form.append("date", new Date());
  form.append("auditorId", localStorage.getItem("userId"));

  for (var i = 0; i < values.images.length; i++) {
    form.append("images", values.images[i]);
  }

  return await fetch(url, reqs.generateFormRequestData(form)).then(
    (response) => response.status
  );
}
