const axios = require('axios');

class GitHubWrapper {
    constructor(token) {
        this.token = token
        this.client = axios.create({
            baseURL: 'https://api.github.com/',
            responseType: 'json',
            headers: {
                'X-Custom-Header': this.token,
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'token ' + this.token
            }
        })
    }

    getRequest(path) {
        return this.client.get(path)
    }

    postRequest(path, payload) {
        return this.client.post(path, payload)
    }

    deleteRequest(path) {
        return this.client.delete(path)
    }

    patchRequest(path, payload) {
        return this.client.patch(path, payload)
    }

    root() {
        return this.getRequest('/')
    }

    createGist(payload) {
        return this.postRequest('/gists', payload)
    }

    getGist(gistId) {
        return this.getRequest(`/gists/${gistId}`)
    }

    deleteGist(gistId) {
        return this.deleteRequest(`/gists/${gistId}`)
    }

    updateGist(gistId, payload) {
        return this.patchRequest(`/gists/${gistId}`, payload)
    }

    filterGists(location, filterString) {
        this.getRequest(location).then((response) => {
        for (let gist of response.data){
            if (gist.description.includes(filterString)){
                return `${gist.description}  -  ${gist.url}`
            }
        }})
    }

    getComments(gistId) {
        return this.getRequest(`/gists/${gistId}/comments`)
    }

    async getCommentsCount(gistId) {
        return await this.getComments(gistId).then((response) => {
            return Object.keys(response.data).length
        })
    }
}

module.exports = GitHubWrapper