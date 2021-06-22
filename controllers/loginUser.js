import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // if passwords match
          // store user session, will talk about it later
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      });
    } else {
      res.redirect('/auth/login');
    }
  });
};
