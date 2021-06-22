import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';
import fileUpload from 'express-fileupload';
import expressSession from 'express-session';
import flash from 'connect-flash';

// Controllers
import newPostController from './controllers/newPost.js';
import aboutController from './controllers/about.js';
import contactsController from './controllers/contacts.js';
import postController from './controllers/post.js';
import homeController from './controllers/home.js';
import postStoreController from './controllers/postStore.js';
import newUserController from './controllers/newUser.js';
import storeUserController from './controllers/storeUser.js';
import loginController from './controllers/login.js';
import loginUserController from './controllers/loginUser.js';
import logoutController from './controllers/logout.js';

// Midllewares
import validationMiddleware from './middleware/validationMiddleware.js';
import authMiddleware from './middleware/authMiddleware.js';
import redirectIfAuthenticatedMiddleware from './middleware/redirectIfAuthenticatedMiddleware.js';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use('/posts/store', validationMiddleware);
app.use(
  expressSession({
    secret: 'keyboard cat',
  })
);
app.use(flash());

global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// db connection
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactsController);
app.get('/posts/new', newPostController);
app.post('/posts/store', authMiddleware, postStoreController);
app.get('/post/:id', postController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  '/users/login',
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.use((req, res) => res.render('notfound'));

// running the app

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
