import * as reqs from "../requests/requests";

export async function getTenants() {
  const url = reqs.createUrl("/users/tenants");
  return await fetch(url, reqs.generateRequestData("GET", null))
    .then((response) => response.json());
}

export async function addTenant(values) {
  console.log(values);
  const url = reqs.createUrl("/users/tenants/create");
  return await fetch(url, reqs.generateRequestData("POST", values))
    .then((response) => response.json());
}

// TODO: Figure out how to implement this in the backend
export async function updateTenant(values) {
  console.log(values);
}

export async function deleteTenant(values) {
  const url = reqs.createUrl("/users/tenants/delete");
  const body = {UserId: parseInt(values)};
  await fetch(url, reqs.generateRequestData("DELETE", body))
    .then((response) => response.json())
    .then((result) => console.log(result));
}

export async function getInstitutions() {
  const url = reqs.createUrl("/users/institutions");
  return await fetch(url, reqs.generateRequestData("GET", null))
    .then((response) => response.json());
}
