const router = require('express').Router();
const database = require('../db');
const wwAPI = require('ww-api');

const COLLECTION_NAME = 'History';

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { term } = query;
        let termCleaned = term?.split('/').filter((str) => str !== '')[0] || '';

        const searched = await wwAPI.search(termCleaned);
        const results = {
            searchTerm: termCleaned,
            results: searched.map((result) => {
                return { display: result.name, id: result.id };
            })
        };

        const alreadyExists =
            (await database.find(COLLECTION_NAME, termCleaned)) ||
            (await database.findById(COLLECTION_NAME, searched[0].id));

        if (alreadyExists) {
            await database.update(COLLECTION_NAME, termCleaned, {
                lastSearched: new Date()
            });
        } else {
            await database.save(COLLECTION_NAME, {
                searchTerm: termCleaned,
                searchCount: searched.length,
                lastSearched: new Date(),
                uid: searched[0].id
            });
        }
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error.toString());
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;

        const originalData = await database.findById(COLLECTION_NAME, id);
        const searchedById = await wwAPI.searchById(originalData?.uid);

        await database.update(COLLECTION_NAME, originalData?.searchTerm, {
            searchCount: originalData?.searchCount + 1,
            lastSearched: new Date(),
            selections: originalData?.selections
                ? [
                      ...originalData?.selections,
                      {
                          id: originalData?.uid,
                          display: originalData?.searchTerm
                      }
                  ]
                : [{ id: originalData?.uid, display: originalData?.searchTerm }]
        });
        return res.status(200).json(searchedById);
    } catch (error) {
        return res.status(500).json(error.toString());
    }
});

module.exports = router;
