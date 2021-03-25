import { useEffect, useState } from "react";
import createUrl from "../requests/requests";

export async function getOutlets() {
    const url = createUrl("/directory/outlets");
    return await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080"
          }
    }).then((response) => response.json());
}

export async function addOutlet(values) {
    // console.log(values);

    const url = createUrl("/directory/outlets/add");
    return await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    }).then((response) => response.json());
}

export async function updateOutlet(values) {
    const url = createUrl("/directory/outlets/update");
    return await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    }).then((response) => response.json());
}

export async function deleteOutlet(values) {
    console.log(values);
    const url = createUrl("/directory/outlets/delete");
    return await fetch(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            outletid: parseInt(values)
        })
    }).then((response) => (response.json()));
}