
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongoose = require('mongoose');
// const DataModel = require('./dataModel'); // Assuming your model file is named dataModel.js

// const uri = `mongodb+srv://developerhabib1230:habibMongoDB@cluster0.dddvn8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         debug: true
//     }
// });

// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

//         // Mongoose connection
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Connected to MongoDB via Mongoose");

//         // Example data to insert
//         const exampleData = {
//             name: "John Doe",
//             email: "john@example.com",
//             phone: "1234567890",
//             text: "This is a sample text"
//         };

//         // Create a new document using Mongoose model
//         const newData = await DataModel.create(exampleData);
//         console.log("New data inserted:", newData);
//     } finally {
//         await client.close();
//         await mongoose.disconnect();
//         console.log("Disconnected from MongoDB");
//     }
// }

// run().catch(console.dir); 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Serve static files from the specified directory
const frontendDirectory = path.join('D:\\', 'Git Clones', 'Value-adder-habib-v-1.2---webApp');
app.use(express.static(frontendDirectory));

// Define route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendDirectory, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://developerhabib1230:habibMongoDB@cluster0.dddvn8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Define Comment schema
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    text: String
});

// Create Comment model
const Comment = mongoose.model('Comment', commentSchema);

// API Routes
// GET all comments
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
app.post('/api/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        text: req.body.text
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// GET a single comment by ID
app.get('/api/comments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update a comment by ID
app.put('/api/comments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});