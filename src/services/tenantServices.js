import * as reqs from "../requests/requests";

export async function getInstitutions() {
  const url = reqs.createUrl("/users/institutions");
  return await fetch(url, reqs.generateRequestData("GET", null))
    .then((response) => response.json());
  // let response = await fetch("http://localhost:8080/users/institutions", {
  //       mode: "cors",
  //       method: "GET",
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:8080"
  //       }
  // });
  // let json = await response.json();
  // let institutions = json.institutions;
  // return institutions;
}

const KEYS = {
  tenants: "tenants",
  tenantId: "tenantId",
};

export function generateTenantId() {
  if (localStorage.getItem(KEYS.tenantId) == null)
    localStorage.setItem(KEYS.tenantId, "0");
  var id = parseInt(localStorage.getItem(KEYS.tenantId));
  localStorage.setItem(KEYS.tenantId, (++id).toString());
  return id;
}

export async function getTenants() {
  const url = reqs.createUrl("/users/tenants");
  return await fetch(url, reqs.generateRequestData("GET", null))
    .then((response) => response.json());
}

// save into localStorage then convert to JSON
export function insertTenant(data) {
  let tenants = getTenants();
  data["id"] = generateTenantId();
  tenants.push(data);
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}

export function updateTenant(data) {
  let tenants = getTenants();
  let recordIndex = tenants.findIndex((x) => x.id === data.id);
  tenants[recordIndex] = { ...data };
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}

export function deleteTenant(id) {
  let tenants = getTenants();
  tenants = tenants.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}
