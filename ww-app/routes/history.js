const router = require('express').Router();
const database = require('../db');

/**
 * @api {GET} /history              get search history from database
 * @apiExample                      localhost:8888/history
 */
router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let history;
        if (searchTerm) {
            // find history by searchTerm
            history = await database.find('History', {searchTerm});
        } else {
            // get all search history
            history = await database.find('History');
        }
        res.json(history);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
