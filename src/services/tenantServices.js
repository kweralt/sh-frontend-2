export async function getInstitutions() {
  let response = await fetch("http://localhost:8080/users/institutions", {
        mode: "cors",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080"
        }
  });
  let json = await response.json();
  let institutions = json.institutions;
  return institutions;
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

export async function getAllTenants() {
  let response = await fetch("http://localhost:8080/users/tenants", {
    mode: "cors",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080"
    }
  });
  let json = await response.json();
  let tenants = json.tenants;

  // console.log(tenants);

  return tenants;
}

// save into localStorage then convert to JSON
export function insertTenant(data) {
  let tenants = getAllTenants();
  data["id"] = generateTenantId();
  tenants.push(data);
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}

export function updateTenant(data) {
  let tenants = getAllTenants();
  let recordIndex = tenants.findIndex((x) => x.id === data.id);
  tenants[recordIndex] = { ...data };
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}

export function deleteTenant(id) {
  let tenants = getAllTenants();
  tenants = tenants.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.tenants, JSON.stringify(tenants));
}
