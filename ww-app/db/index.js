const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cs4220-final.prhqnwm.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = MongoClient(mongoURL);
            await client.connect();

            db = client.db();
            console.log('Connected to Mongo DB');
        } catch (error) {
            console.error(error);
        }
    }

    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function find(collectionName, searchIdentifier) {
        try {
            const collection = db.collection(collectionName);
            if (searchIdentifier) {
                return await collection
                    .find({ searchId: searchIdentifier })
                    .next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        connect,
        save,
        find
    };
};

module.exports = mongo();
