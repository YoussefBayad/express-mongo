import User from '../models/User.js';
import path from 'path';

export default (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      return res.redirect('/auth/register');
    }
    res.redirect('/');
  });
};
