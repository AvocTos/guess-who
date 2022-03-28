const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    const root = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports.app = app;
app.listen(process.env.PORT || 8080);
