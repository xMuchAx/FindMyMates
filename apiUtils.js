export async function callApi(url, method, data, token) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const requestOptions = {
            method: method,
            headers: headers,
        };

        // Ajouter le corps de la requête uniquement si la méthode n'est pas GET
        if (method !== "GET") {
            requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, requestOptions);

        const result = await response.json();
        console.log("Success:", result);
        return result;

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
