const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
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
console.log(uri);
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

        app.get("/items", async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        // app.post("/add-items", async (req, res) => {
        //     const item = req.body;
        //     const result = await itemCollection.insertOne(item);
        //     res.send({ success: 'product added' });
        // });

        // app.get('/manage-inventory', async (req, res) => {
        //     const items = await itemCollection.find({}).toArray();
        //     req.send(items);
        // });

        // app.get('/my-items', async (req, res) => {
        //     const userItems = await userItemsCollection.find({ email }).toArray();
        //     req.send(userItems);
        // });
    }
    finally {

    }
}

run().catch(console.dir);
