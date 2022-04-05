const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/users', async (req, res) => {
    const results = await db.getUsers();
    res.send(results);
});

app.get('/api/scoreboard', async (req, res) => {
    try {
        const results = await db.getScoreBoard();
        res.send(results);
    } catch(err) {
        console.log(err.message);
    }
});

app.get('/api/user/:name', async (req, res) => {
    try {
        const results = await db.findUser(req.params.name);
        console.log('name', results);
        return res.json(results);
    } catch(err) {
        console.log(err.message);
    }
});

app.get('/api/user/id/:sessionId', async (req, res) => {
    try {
        const results = await db.findSessionId(req.params.sessionId);
        return res.json(results);
    } catch(err) {
        console.log(err.message);
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = req.body;
        const results = await db.addUser(user);
        res.json(results);
    } catch(err) {
        console.log(err.message);
    }
});

app.put('/api/user/:name', async (req, res) => {
    try {
        await db.updateUser(req.body.sessionId, req.params.name);
        res.end();
    } catch(err) {
        console.log(err.message);
    }
});

app.put('/api/user/score/:name', async (req, res) => {
    try {
        await db.updatePoints(req.body.score, req.params.name);
        res.end();
    } catch(err) {
        console.log(err.message);
    }
});

app.get('/', (req, res) => {
    const root = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});


module.exports.app = app;
app.listen(process.env.PORT || 8080);
