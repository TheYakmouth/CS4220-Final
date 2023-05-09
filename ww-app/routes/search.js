const router = require('express').Router();

const database = require('../db');
const wwAPI = require('ww-api');

router.use((req, res, next) => {
    const {headers, query} = req;



    next();
})

module.exports = router;