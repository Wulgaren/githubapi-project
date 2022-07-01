const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const GitHubWrapper = require('/Users/natios/Documents/School/JS/project/wrapper/wrapper-module')

var wrapper = new GitHubWrapper('');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Git Wrapper has been created.')
})

app.get(`/gist/:gistId/comments`, (req, res) => {
    let comments = "";
    wrapper.getComments(req.params.gistId).then((response) => {
        console.log(response.data)
        response.data.forEach(element => {
            comments += element.body + '<br>'
        });
        res.send("Komentarze: <br><br>" + comments)
    })
})

app.get(`/gist/:gistId/comments/count`, (req, res) => {
    wrapper.getCommentsCount(req.params.gistId).then((count) => {
        res.send(`Ilość komentarzy: ${count}`)
    })
})

app.get('/github-routes', (req, res) => {
    wrapper.getGist('d7a4dde80a396c9d6b1058e28c76e825').then(response => {
        res.send(response.data['description'])
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
