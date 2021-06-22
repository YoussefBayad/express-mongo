import User from '../models/User.js';
import path from 'path';

export default (req, res) => {
  User.create(req.body, (error, user) => {
    res.redirect('/');
  });
};
