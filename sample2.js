const axios = require('axios');
const GitHub = require('github-api');

class GithHubWrapper {
  constructor(token) {
    this.token = token
  }
}

let ghWrapper = new GithHubWrapper('TOKEN_GITHUB')
console.log(ghWrapper)
ghWrapper.token = "NEW_GITHUB_TOKEN"
ghWrapper.createGist("TITLE", "DESCRIPTION", ["FILE1", "FILE2"])
ghWrapper.getGist("GISTIT")
