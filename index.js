const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
require('dotenv').config();
// const jwt = require('jsonwebtoken');


const port = process.env.PORT || 4000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log('listening to', port);
});

const uri = `mongodb+srv://${process.env.DB_USER2}:${process.env.DB_PASSWORD2}@cluster0.jewnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function run () {
//     try {
//         await client.connect();
//         const itemCollection = client.db('bookMania').collection('items');
//         console.log("database connected");
//     }
//     finally {

//     }
// }

// run().catch(console.dir);

async function run () {
    try {
        await client.connect();
        console.log("database connected");

        const itemCollection = client.db("bookMania").collection("items");
        // const userItemsCollection = client.db("bookMania").collection("userItems");
        // console.log(itemCollection);

        // request for getting all the inventory items
        app.get("/items", async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        // request for adding a new item in the inventory
        app.post("/add-items", async (req, res) => {
            const item = req.body;
            const result = await itemCollection.insertOne(item);
            console.log("item added");
            res.send({ success: 'product added' });
        });

        // request for fetching one single item
        app.get("/items/:id", async (req, res) => {
            const itemId = req.params.id;
            const query = { _id: ObjectId(itemId) };
            const item = await itemCollection.findOne(query);
            res.send(item);
        });

        // Update stock quantity
        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const updatedItem = req.body;
            // console.log(updatedItem);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedItem.quantity
                }
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        // request for delete an item
        app.delete('/items/:id', async (req, res) => {
            const itemId = req.params.id;
            const query = { _id: ObjectId(itemId) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        });

        // app.get('/my-items', async (req, res) => {
        //     const userItems = await userItemsCollection.find({ email }).toArray();
        //     req.send(userItems);
        // });
    }
    finally {

    }
}

run().catch(console.dir);
