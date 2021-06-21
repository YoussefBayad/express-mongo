import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
