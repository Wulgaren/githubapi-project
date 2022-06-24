const GitHubWrapper = require('/Users/natios/Documents/School/JS/project/wrapper/wrapper-module')

describe("tests for GitHubWrapper", () => {
    
  describe("#root", () => {
    test("root returns links to all API resources", () => {
      //sprawdzic czy token jest ok jak nie to dostajemy 401
      let ghWrapper = new GitHubWrapper("");
      return ghWrapper.root().then(response => {
        console.log(response)
        expect(response.status).toEqual(200);
        expect(response.statusText).toBe("OK");
        expect(response.data["authorizations_url"]).toBe("https://api.github.com/authorizations");
        // expect(response.data["createGist"]).toBe("https://api.github.com/authorizations");
      });
    })
  })

  describe('#getGists', () => {
    test("get gist from id", () => {
      //sprawdzic czy token jest ok jak nie to dostajemy 401
      let ghWrapper = new GitHubWrapper("");
      return ghWrapper.getGist('d7a4dde80a396c9d6b1058e28c76e825').then(response => {
        console.log(response)
        expect(response.data["description"]).toBe("Hello World Examples 2343");
      });
    })
  })
})