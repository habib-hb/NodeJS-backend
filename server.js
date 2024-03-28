// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://developerhabib1230:habibMongoDB@cluster0.dddvn8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// //233Ds9L3ILjNOiuW
// //mongodb+srv://developerhabib1230:*110011#@cluster0.dddvn8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     // strict: true,
//     // deprecationErrors: true,
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     debug: true
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const DataModel = require('./dataModel'); // Assuming your model file is named dataModel.js

const uri = `mongodb+srv://developerhabib1230:habibMongoDB@cluster0.dddvn8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        debug: true
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Mongoose connection
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB via Mongoose");

        // Example data to insert
        const exampleData = {
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
            text: "This is a sample text"
        };

        // Create a new document using Mongoose model
        const newData = await DataModel.create(exampleData);
        console.log("New data inserted:", newData);
    } finally {
        await client.close();
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

run().catch(console.dir);

