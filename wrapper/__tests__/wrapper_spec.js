const GitHubWrapper = require('/Users/natios/Documents/School/JS/project/wrapper/wrapper-module')
      
//sprawdzic czy token jest ok jak nie to dostajemy 401
var ghWrapper = new GitHubWrapper("");

describe("tests for GitHubWrapper", () => {
    
  describe("#root", () => {
    test("root returns links to all API resources", () => {
      return ghWrapper.root().then(response => {
        // console.log(response)
        expect(response.status).toEqual(200);
        expect(response.statusText).toBe("OK");
        expect(response.data["authorizations_url"]).toBe("https://api.github.com/authorizations");
        // expect(response.data["createGist"]).toBe("https://api.github.com/authorizations");
      });
    })
  })

  describe('#getGists', () => {
    test("get gist from id", () => {
      return ghWrapper.getGist('d7a4dde80a396c9d6b1058e28c76e825').then(response => {
        // console.log(response.data)
        expect(response.data["description"]).toBe("Hello World Examples 2343");
      });
    })
  })

  describe('#getGistComments', () => {
    test('get gist comments from gist id', () => {
      return ghWrapper.getComments('d7a4dde80a396c9d6b1058e28c76e825').then(response => {
        // console.log(response.data[0].body)
        expect(response.data[0].body).toBe('test commeent')
      })
    })
  })

  describe('#getGistCommentsCount', () => {
    test('get count of gist comments from gist id', () => {
      // console.log(ghWrapper.getCommentsCount('d7a4dde80a396c9d6b1058e28c76e825'))
      ghWrapper.getCommentsCount('d7a4dde80a396c9d6b1058e28c76e825').then((count) => {
        expect(count).toEqual(2)
      })
    })
  })
})