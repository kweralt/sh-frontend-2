import * as reqs from "../requests/requests";

export async function getDashboardData() {
  let auditorId = localStorage.getItem("userId");
  const url = reqs.createUrl(`/dashboard/${auditorId}`);

  return await fetch(url, reqs.generateRequestData("GET")).then((response) => {
    console.log(response.status);
    return response.json();
  });
}

export async function getScoresTableData(selectedDate) {
  console.log(typeof(selectedDate), selectedDate);
  const body = {
    auditorId: localStorage.getItem("userId"),
    month: selectedDate.getMonth() + 1,
    year: selectedDate.getFullYear(),
  };
  console.log(body);
  const url = reqs.createUrl("/dashboard/monthly");
  return await fetch(
    url,
    reqs.generateRequestData("POST", body)
  ).then((response) => response.json());
}
