import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';
import fileUpload from 'express-fileupload';
import newPostController from './controllers/newPost.js';
import aboutController from './controllers/about.js';
import contactsController from './controllers/contacts.js';
import postController from './controllers/post.js';
import homeController from './controllers/home.js';
import postStoreController from './controllers/postStore.js';

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

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactsController);
app.get('/posts/new', newPostController);
app.post('/posts/store', postStoreController);
app.get('/post/:id', postController);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
