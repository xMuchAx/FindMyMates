interface RequestOptions {
    method: string
    headers: Record<string, string>
    body?: string
}

async function request(url: string, method: string, data?: object, auth_token?: string): Promise<object | undefined> {

    const headers: Record<string, string> = {'Content-Type': 'application/json'}

    if(auth_token) {
        headers['Authorization'] = `Bearer ${auth_token}`
    }

    var options: RequestOptions = {method, headers}

    if(data) {
        options.body = JSON.stringify(data)
    }

    try {
        var response = await fetch(url, options)
        var resData = await response.json()

        if(response.ok) {
            return resData
        } else {
            console.error(resData)
            throw new Error("Request failed");
        }
    } catch (error) {
        console.error(error)
        throw new Error("Request failed");
    }
}

export default request