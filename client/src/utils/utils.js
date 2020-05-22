
require('dotenv').config();

export function getBaseUrl() {
    return (process.env.NODE_ENV === "development") ? "http://localhost:8001/api" : "";
}

export function createRequest(requestMethod, data) {
    return {
        method: requestMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}