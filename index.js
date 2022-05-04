const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');



// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log('listening to', port);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mjof2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();
        console.log("database connected");

        const itemCollection = client.db("bookMania").collection("items");
        const userItemsCollection = client.db("bookMania").collection("userItems");

        app.post("/addItems", async (req, res) => {
            const item = req.body;

        });

        app.get('/manage-inventory', async (req, res) => {
            const items = await itemCollection.find({}).toArray();
            req.send(items);
        });

        app.get('/my-items', async (req, res) => {
            const userItems = await userItemsCollection.find({ email }).toArray();
            req.send(userItems);
        });
    }
    finally {

    }
}

run().catch(console.dir);
