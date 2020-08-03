const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const methodOverride = require('method-override');

require('./models/User');
require('./models/Member');
require('./models/Group');
require('./models/Project');
require('./services/passport');

console.log('mongo uri is ' + keys.mongoURI);
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(
  cookieSession({
    // 30 days converted into milli seconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('test');
});

require('./routes/authRoutes')(app);
require('./routes/projects')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
