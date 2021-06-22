import User from '../models/User.js';
import path from 'path';

export default (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.session.validationErrors = validationErrors;
      return res.redirect('/auth/register');
    }
    req.session.userId = user._id;
    res.redirect('/');
  });
};
