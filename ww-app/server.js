const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const mongo = require('./db');

// app.use('/', express.static(path.join(__dirname, './client')))

const search = require('./routes/search.js');
app.use('/search', search);

const results = require('./routes/results.js');
app.use('/results', results);

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
    await mongo.connect();
});
