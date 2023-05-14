const express = require('express');

const app = express();
const port = 8888;

const mongo = require('./db');

const search = require('./routes/search.js');
app.use('/search', search);

const history = require('./routes/history.js');
app.use('/history', history);

app.listen(port, async () => {
    await mongo.connect();
    console.log(`Server listening on port ${port}`);
});
