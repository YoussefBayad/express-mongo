import mongoose from 'mongoose';
import BlogPost from './models/BlogPost.js';

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

BlogPost.find({}, (error, blogspot) => {
  console.log(error, blogspot);
});
