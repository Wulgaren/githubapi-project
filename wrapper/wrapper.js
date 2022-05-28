const axios = require('axios');

class GithHubWrapper {
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

    filterGists(responseData, filterString) {
        for (let gist of responseData){
            if (gist.description.includes(filterString)){
                console.log(gist)
            }
        }
    }
}

let token = "insert token"
let gistItem = "387793c056a365a976495211feca4a78";

let ghWrapper = new GithHubWrapper(token)
let gistPayload = {
    "description": "Hello World Examples",
    "public": true,
    "files": {
        "hello_world.rb": {
            "content": "class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n      puts \"Hello !\"\n   end\nend\n\nhello = HelloWorld.new(\"World\")\nhello.sayHi"
        },
        "hello_world.py": {
            "content": "class HelloWorld:\n\n    def __init__(self, name):\n        self.name = name.capitalize()\n       \n    def sayHi(self):\n        print \"Hello \" + self.name + \"!\"\n\nhello = HelloWorld(\"world\")\nhello.sayHi()"
        },
        "hello_world_ruby.txt": {
            "content": "Run `ruby hello_world.rb` to print Hello World"
        },
        "hello_world_python.txt": {
            "content": "Run `python hello_world.py` to print Hello World"
        }
    }
}

// ghWrapper.root().then((response) => console.log(response.data))
// ghWrapper.getGist(gistItem).then((response) => console.log(response.data))
// ghWrapper.createGist(gistPayload).then((response) => console.log(response.data))
ghWrapper.getRequest("/gists").then((response) => ghWrapper.filterGists(response.data, "a"))
// ghWrapper.deleteGist(gistItem).then((response) => console.log(response.data))
// ghWrapper.updateGist(gistItem, gistPayload).then((response) => console.log(response.data))
