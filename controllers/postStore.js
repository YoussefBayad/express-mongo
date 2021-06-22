import path from 'path';
import { fileURLToPath } from 'url';
import BlogPost from '../models/BlogPost.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, 'public/assets/img', image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,
        image: '/assets/img/' + image.name,
        userId: req.session.userId,
      });
      res.redirect('/');
    }
  );
};
