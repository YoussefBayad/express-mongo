import BlogPost from '../models/BlogPost.js';

export default async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).populate('userId');
  res.render('post', {
    blogpost,
  });
};
