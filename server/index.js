const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const fs = require('fs');

const app = express();

app.use(cors());

app.get('/api/users', async (req, res) => {
    const results = await db.getUsers();
    console.log(results);
    res.send(results);
});

app.get('/', (req, res) => {
    const root = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports.app = app;
app.listen(process.env.PORT || 8080);
