const axios = require('axios');
const GitHub = require('github-api');

class GithHubWrapper {
  constructor(token) {
    this.token = token
  }

  client(token = this.token) {
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000,
      headers: {'X-Custom-Header': token}
    });
  }

  githubApi() {
    return new GitHub();
  }

  axios() {
    return axios.create({
      baseURL: 'https://api.example.com'
    });
  }

  set token(newToken) {
    this.token = newToken
  }

  createGist(title, comment, body) {
    client().post(....)
  }

  getGist(gistId) {
    return client().get(`/gist/${gistId}`)
  }
}
