const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const GitHubWrapper = require('/Users/natios/Documents/School/JS/project/wrapper/wrapper-module')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hey!')
})

app.get('/app1', (req, res) => {
    res.send('hello from app1')
})

app.get('/app2', (req, res) => {
    res.send('hello from app2')
})

app.get('/github-routes', (req, res) => {
    let wrapper = new GitHubWrapper('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');
    wrapper.getGist('d7a4dde80a396c9d6b1058e28c76e825').then(response => {
        res.send(response.data['description'])
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
