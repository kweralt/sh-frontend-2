import { useEffect, useState } from "react";
import createUrl from "../requests/requests";

export async function addOutlet(values) {
    console.log(values);

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