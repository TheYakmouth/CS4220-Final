const router = require('express').Router();

const database = require('../db');
const wwAPI = require('ww-api');

// router.use((req, res, next) => {
//     const { headers, query } = req;

//     next();
// });

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

        // console.log(results);

        res.json(results);

        database.save('Results', { ...results });
    } catch (error) {
        res.status(500).json(error.toString());
        // console.error(error);
    }
});

module.exports = router;
