import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import ejs from 'ejs';
import BlogPost from './models/BlogPost.js';
import fileUpload from 'express-fileupload';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.use(fileUpload());

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    return res.redirect('/posts/new');
  }
  next();
};

app.use('/posts/store', validateMiddleWare);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.post('/posts/store', (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, 'public/assets/img', image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: '/assets/img/' + image.name,
      });
      res.redirect('/');
    }
  );
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
