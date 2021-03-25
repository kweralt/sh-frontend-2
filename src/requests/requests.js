const BASE_URL = "http://localhost:8080";

export const createUrl = (path) => `${BASE_URL}${path}`;

export const generateRequestData = (requestMethod, bodyContent) => {
    if (requestMethod === "GET") {
        return {
            mode: "cors",
            method: requestMethod,
            headers: {
                "Access-Control-Allow-Origin": BASE_URL
              }
        };
    } else {
        return {
            mode: "cors",
            method: requestMethod,
            headers: {
                "Access-Control-Allow-Origin": BASE_URL,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyContent)
        };
    }
};