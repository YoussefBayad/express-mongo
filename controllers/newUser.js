import flash from 'connect-flash';
export default (req, res) => {
  res.render('register', {
    errors: req.flash('validationErrors'),
  });
};
