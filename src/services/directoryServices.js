import * as reqs from "../requests/requests";

export async function getOutlets() {
    const url = reqs.createUrl("/directory/outlets");
    return await fetch(url, reqs.generateRequestData("GET", null))
        .then((response) => response.json());
}

export async function addOutlet(values) {
    const url = reqs.createUrl("/directory/outlets/add");
    return await fetch(url, reqs.generateRequestData("PUT", values))
        .then((response) => response.json());
}

export async function updateOutlet(values) {
    const url = reqs.createUrl("/directory/outlets/update");
    return await fetch(url, reqs.generateRequestData("POST", values))
        .then((response) => response.json());
}

export async function deleteOutlet(values) {
    console.log(values);
    const url = reqs.createUrl("/directory/outlets/delete");
    const body = {outletid: parseInt(values)};
    return await fetch(url, reqs.generateRequestData("DELETE", body))
        .then((response) => response.json());
}