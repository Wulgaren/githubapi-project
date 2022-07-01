const GitHubWrapper = require('/Users/natios/Documents/School/JS/project/wrapper/wrapper-module')

var token = ""
//sprawdzic czy token jest ok jak nie to dostajemy 401
let gistItem = "d7a4dde80a396c9d6b1058e28c76e825";

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

// ghWrapper.root().then((response) => console.log(response.data))
// ghWrapper.getRequest("/gists/public").then((response) => {
//     for (let gist of response.data){    
//         console.log(gist.description)
//     }
// })
// console.log(Promise.resolve(ghWrapper.getCommentsCount(gistItem)))
ghWrapper.getCommentsCount(gistItem).then(console.log)
// ghWrapper.getGist(gistItem).then((response) => console.log(response.data.description, ' - ', response.data.url))
// ghWrapper.createGist(gistPayload).then((response) => console.log(response.data))
// ghWrapper.filterGists("/gists", "")
// ghWrapper.deleteGist(gistItem).then((response) => console.log(response.data))
// ghWrapper.updateGist(gistItem, gistPayload).then((response) => console.log(response.data))