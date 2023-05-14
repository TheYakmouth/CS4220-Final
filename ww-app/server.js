const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const mongo = require('./db');

// app.use('/', express.static(path.join(__dirname, './client')))

const search = require('./routes/search.js');
const history = require('./routes/history.js');
app.use('/search', search);
app.use('/history', history);

// const results = require('./routes/results.js');
// app.use('/results', results);

app.listen(port, async () => {
    await mongo.connect();
    console.log(`Server listening on port ${port}`);
});
