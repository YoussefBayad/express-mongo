export default (req, res) => {
  res.render('register', {
    errors: req.session.validationErrors,
  });
};
