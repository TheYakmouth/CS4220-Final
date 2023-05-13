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

        termCleaned = term.split('/').filter((str) => str !=='')[0];

        const searched = await wwAPI.search(termCleaned);

        const results = {
            searchTerm: termCleaned,
            results: searched.map((result) => {
                return { display: result.name, id: result.id };
            })
        };

        // console.log(termCleaned);

        res.json(results);

        // database.save('Results', { id: searched[0].id, ...searched });
        database.save('Results', {
            searchTerm: termCleaned,
            searchCount: searched.length,
            lastSearched: new Date()
        });
    } catch (error) {
        res.status(500).json(error.toString());
        // console.error(error);
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const { params, query } = req;
        const { id } = params;
        const { term } = query;

        console.log(term.split('/'));

        const originalData = await database.find('Results', term);

        const searchedById = await wwAPI.searchById(id);

        // const results = {
        //     searchId: id,
        //     results: searchedById
        // }

        // const searchedById = await database.find('Results', id);

        res.json(searchedById);

        database.update('Results', term, {
            searchCount: originalData.searchCount + 1,
            lastSearched: new Date(),
            selections: [...selections, { id, display: searchedById.name }]
        });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
