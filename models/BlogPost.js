import mongoose from 'mongoose';

const schema = mongoose.Schema;

const BlogPostSchema = new schema({
  title: String,
  body: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datePosted: {
    /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date(),
  },
  image: String,
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;
