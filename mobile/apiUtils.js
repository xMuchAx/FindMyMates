export async function callApi(url, method, data, options = {}) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        return result;

    } catch (error) {
        
        console.error("Error:", error);
        throw error; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
    }
}
