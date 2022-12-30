const express = require('express');

const app = express();
const port = 2002;

app.get('/users', (req, res) => {
    res.send("querystring page")
});

app.post('/login', (req, res) => {
    res.send("login page")
});

app.post('/logout', (req, res) => {
    res.send("logout page")
});

app.get('/register', (req, res) => {
    res.send("register page")
});

app.listen(port, () => {
    console.log(port, "서버 열림")
});