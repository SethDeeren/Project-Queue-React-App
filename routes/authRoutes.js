const passport = require('passport');

module.exports = (app) => {
  // the string 'google' tells passport to use the strategy from google created above
  // scope is what we are asking from google to get access from the user we could ask for more this determines the access token we get back
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  // here we get a code in the url from google that is exchanged for a user and a token
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    // logout() attached to req by passport
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    // user attached to req by passport
    res.send(req.user);
  });
};
