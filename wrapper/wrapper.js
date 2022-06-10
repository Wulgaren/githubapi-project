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
        return this.getRequest('/').then((response) => console.log(response.data))
    }

    createGist(payload) {
        return this.postRequest('/gists', payload).then((response) => console.log(response.data))
    }

    getGist(gistId) {
        return this.getRequest(`/gists/${gistId}`).then((response) => console.log(response.data.description, ' - ', response.data.url))
    }

    deleteGist(gistId) {
        return this.deleteRequest(`/gists/${gistId}`).then((response) => console.log(response.data))
    }

    updateGist(gistId, payload) {
        return this.patchRequest(`/gists/${gistId}`, payload).then((response) => console.log(response.data))
    }

    filterGists(location, filterString) {
        this.getRequest(location).then((response) => {
        for (let gist of response.data){
            if (gist.description.includes(filterString)){
                console.log(gist.description, ' - ', gist.url)
            }
        }})
    }
}

let token = "insert token"
m = "c5ca8f4fef857763e92a2c2a8092ce6b";

let ghWrapper = new GitHubWrapper(token)
let gistPayload = {
    "description": "Hello World Examples 2",
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

// ghWrapper.root()
ghWrapper.getRequest("/gists/public").then((response) => {
    for (let gist of response.data){    
        console.log(gist.description)
    }
})
// ghWrapper.getGist(gistItem)
// ghWrapper.createGist(gistPayload)
// ghWrapper.filterGists("/gists", "")
// ghWrapper.deleteGist(gistItem)
// ghWrapper.updateGist(gistItem, gistPayload)

export default wrapper