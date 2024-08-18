const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load comments from file
function loadComments() {
    try {
        const data = fs.readFileSync('comments.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Save comments to file
function saveComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Get comments
app.get('/api/comments', (req, res) => {
    res.json(loadComments());
});

// Post a comment
app.post('/api/comments', (req, res) => {
    const comments = loadComments();
    const newComment = req.body;

    comments.push(newComment);
    saveComments(comments);

    res.status(201).json(newComment);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
