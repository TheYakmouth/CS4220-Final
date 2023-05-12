const router = require('express').Router();

const database = require('../db');

router.get('/', async (req, res) => {
    try {
        const results = await database.find('Results');
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
