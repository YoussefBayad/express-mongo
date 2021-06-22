import BlogPost from '../models/BlogPost.js';

export default async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts,
  });
};
