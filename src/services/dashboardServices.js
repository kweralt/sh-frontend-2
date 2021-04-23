import * as reqs from "../requests/requests";

export async function getDashboardData() {
  console.log(localStorage);
  let auditorId = localStorage.getItem("userId");
  const url = reqs.createUrl(`/dashboard/${auditorId}`);

  return await fetch(url, reqs.generateRequestData("GET")).then((response) => {
    console.log(response.status);
    return response.json();
  });
}
