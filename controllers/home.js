import BlogPost from '../models/BlogPost.js';

export default async (req, res) => {
  const blogposts = await BlogPost.find({}).populate('userId');
  res.render('index', {
    blogposts,
  });
};
