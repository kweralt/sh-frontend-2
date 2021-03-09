export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

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

export function getAllTenants() {
  if (localStorage.getItem(KEYS.tenants) == null)
    localStorage.setItem(KEYS.tenants, JSON.stringify([]));
  let tenants = JSON.parse(localStorage.getItem(KEYS.tenants));
  // map departmentId to department title
  let departments = getDepartmentCollection();
  return tenants.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title, //relationship is -1 to test
  }));
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
