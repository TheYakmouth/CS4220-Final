const router = require('express').Router();
const COLLECTION_NAME = 'History';
const database = require('../db');

// router.get('/', async (req, res) => {
//     try {
//         const results = await database.find('Results');
//         res.json(results);
//     } catch (error) {
//         res.status(500).json(error.toString());
//     }
// });

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { term } = query;
        const termCleaned =
            term?.split('/').filter((str) => str !== '')[0] || '';
        const history = await database.find(COLLECTION_NAME, termCleaned);
        return res.status(200).json(history || []);
    } catch (error) {
        return res.status(500).json(error.toString());
    }
});

module.exports = router;
