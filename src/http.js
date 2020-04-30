class Http {
    static async get(url) {
        try {
            return await request({url});
        } catch (e) {
            console.log(e);
        }
    };

    static async post(url, data = {}) {
        try {
            return await request({
                    url,
                    method: "POST",
                    data: data,
                });
        } catch (e) {
            console.log(e);
        }
    };

    static async patch(url, data = {}) {
        try {
            return await request({
                url,
                method: "PATCH",
                data: data
            });
        } catch (e) {
            console.log(e);
        }
    };

    static async delete(url) {
        try {
            return await request({
                url,
                method: "DELETE",
            });
        } catch (e) {
            console.log(e);
        }
    };

}

async function request({
                           url,
                           method = "GET",
                           headers = {"Content-Type": "application/json"},
                           data
                       }) {
    const config = {
        method: method,
        headers: headers
    };

    if (method === "POST" || method === "PATCH") {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    return await response.json();
}

export default Http;