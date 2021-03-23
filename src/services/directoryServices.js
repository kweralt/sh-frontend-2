export function getAllOutlets() {
    return fetch("http://localhost:8080/users/institutions", {
        mode: "cors",
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080"
          }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success", data);
        })
        .catch((error) => {
            console.error("Error", error);
        })
}