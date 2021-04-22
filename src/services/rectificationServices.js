import * as reqs from "../requests/requests";

export async function getUnresolvedNC(tenantId) {
  console.log(tenantId);
  const url = reqs.createUrl(`actions/unresolved/${parseInt(tenantId)}`);
  return await fetch(url, reqs.generateRequestData("GET"))
    .then((response) => { return response.json()});
}

export async function getNCReport(ncId) {
  console.log(ncId);
  const url = reqs.createUrl(`actions/resolve/${parseInt(ncId)}`);
  return await fetch(url, reqs.generateRequestData("GET"))
    .then((response) => { return response.json() });
}

export async function submitRectificationImages(images, notes, ncId) {
  const url = reqs.createUrl("actions/submit");
  var form = new FormData();
  form.append("ncId", ncId);
  form.append("notes", notes);
  form.append("submittedOn", new Date());

  for (var i = 0; i < images.length; i++) {
    form.append("images", images[i]);
  }
  return await fetch(url, reqs.generateFormRequestData(form)).then(
    (response) => response.status
  );
}