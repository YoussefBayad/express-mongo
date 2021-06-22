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
import validationMiddleware from './controllers/middleware/validationMiddleware.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use('/posts/store', validationMiddleware);

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
