const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/community", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Post schema
const postSchema = new mongoose.Schema({
    text: String,
    imageUrl: String,
    videoUrl: String,
    timestamp: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

// Storage configuration for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// API endpoint to add a new post
app.post("/api/posts", async (req, res) => {
    const { text, imageUrl, videoUrl } = req.body;
    const newPost = new Post({ text, imageUrl, videoUrl });
    await newPost.save();
    res.json(newPost);
});

// API endpoint to get all posts
app.get("/api/posts", async (req, res) => {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
