const { MongoClient, ObjectId } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cs4220-final.prhqnwm.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();
            console.log('Connected to Mongo DB');
        } catch (error) {
            console.error(error);
        }
    }

    async function save(collectionName, data) {
        try {
            const collection = db?.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.error(error);
        }
    }

    // async function find(collectionName, searchIdentifier) {
    //     try {
    //         const collection = db?.collection(collectionName);
    //         if (searchIdentifier) {
    //             return await collection.find({ id: searchIdentifier }).next();
    //         } else {
    //             return await collection.find({}).toArray();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function find(collectionName, searchIdentifier) {
        try {
            const collection = db?.collection(collectionName);
            if (searchIdentifier) {
                return await collection
                    .find({ searchTerm: searchIdentifier })
                    .next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function findById(collectionName, searchIdentifier) {
        try {
            const collection = db?.collection(collectionName);
            return await collection
                .find({ uid: searchIdentifier })
                .next();
        } catch (error) {
            console.error(error);
        }
    }

    async function update(collectionName, searchIdentifier, data) {
        try {
            const collection = db?.collection(collectionName);

            await collection.updateOne(
                { searchTerm: searchIdentifier },
                { $set: data }
            );
        } catch (error) {
            console.error(error);
        }
    }

    return {
        connect,
        save,
        find,
        findById,
        update
    };
};

module.exports = mongo();
