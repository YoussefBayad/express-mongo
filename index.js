import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import ejs from 'ejs';
import BlogPost from './models/BlogPost.js';
import bodyParser from 'body-parser';

const app = express();
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', async (req, res) => {
  // model creates a new doc with browser data
  await BlogPost.create(req.body);
  res.redirect('/');
});

app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', {
    blogpost,
  });
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
