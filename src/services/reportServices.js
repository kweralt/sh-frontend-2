import * as reqs from "../requests/requests";

export async function getChecklistTypes() {
  const url = reqs.createUrl("/report/checklistTypes");
  return await fetch(url, reqs.generateRequestData("GET")).then((response) =>
    response.json()
  );
}

export async function getQuestions(typeId) {
  const url = reqs.createUrl(`/report/questions/${parseInt(typeId)}`);
  return await fetch(url, reqs.generateRequestData("GET")).then((response) => {
    return response.json();
  });
}

export async function submitChecklist(report, images, checklistType, score) {
  const url = reqs.createUrl("/report/submit");

  var form = new FormData();

  form.append("checklistResponses", JSON.stringify(report));
  form.append("score", score);
  form.append("date", new Date());
  form.append("auditorId", localStorage.getItem("userId"));
  form.append("checklistTypeId", checklistType);

  for (var i = 0; i < images.length; i++) {
    form.append("images", images[i]);
  }

  return await fetch(url, reqs.generateFormRequestData(form)).then(
    (response) => response.status
  );
}
