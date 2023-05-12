const router = require('express').Router();

const database = require('../db');
const wwAPI = require('ww-api');

// router.use((req, res, next) => {
//     const { headers, query } = req;

//     next();
// });

// http://localhost:8888/search?term=[Term]
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { term } = query;

        const searched = await wwAPI.search(term);

        const results = {
            searchTerm: term,
            results: searched.map((result) => {
                return { display: result.name, id: result.id };
            })
        };

        console.log(query);

        res.json(results);

        database.save('Results', { id: results.id, ...results });
    } catch (error) {
        res.status(500).json(error.toString());
        // console.error(error);
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const { params, query } = req;
        const { id } = params;

        const searched = await database.find('Results', id);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
