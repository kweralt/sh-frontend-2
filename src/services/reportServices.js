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
  const body = {
    auditor: localStorage.getItem("userId"),
    date: new Date(),
    answers: values,
  };
  return body;
}
