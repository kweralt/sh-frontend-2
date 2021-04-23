import { saveAs } from "file-saver";
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
  const body = {
    auditorId: localStorage.getItem("userId"),
    month: selectedDate.getMonth() + 1,
    year: selectedDate.getFullYear(),
  };
  const url = reqs.createUrl("/dashboard/monthly");
  return await fetch(
    url,
    reqs.generateRequestData("POST", body)
  ).then((response) => response.json());
}

export async function downloadExcelReport(reportId) {
  const url = reqs.createUrl(`/report/export/${reportId}`);
  const reqOptions = reqs.generateRequestData("GET");

  return new Promise(async (resolve) => {
    return fetch(url, reqOptions).then((response) => {
      if (!response.ok) return resolve(response.status);

      // Get filename from Content-Disposition
      let disposition = response.headers.get("Content-Disposition");
      var filename = "";

      if (disposition && disposition.indexOf("attachment") !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      response.blob().then((blob) => {
        saveAs(blob, filename);
        return resolve(response.status);
      });
    });
  });
}

export async function emailExcelReport(reportId) {
  const url = reqs.createUrl(`/report/email/${reportId}`);
  const reqOptions = reqs.generateRequestData("GET");

  return new Promise(async (resolve) => {
    return fetch(url, reqOptions).then((response) => resolve(response.status));
  });
}
