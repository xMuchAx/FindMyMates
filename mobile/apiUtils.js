export async function callApi(url, method, data, token) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        return result;

    } catch (error) {
        
        console.error("Error:", error);
        throw error;
    }
}
