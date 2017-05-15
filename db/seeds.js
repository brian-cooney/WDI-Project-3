const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Widget = require('../models/widget');
const User = require('../models/user');
const config = require('../config/config');

mongoose.connect(config.db);
Widget.collection.drop();
User.collection.drop();

Widget
  .create([{
    type: 'weather',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d2c4c1492a04ec9081fe74119400cc6e',
    data: {}
  }, {
    type: 'news',
    url: 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=220bcdb5f5bd425194e8e6914bf03244',
    data: {}
  }, {
    type: 'breakfast',
    url: 'https://api.edamam.com/search?q=breakfast',
    data: {}
  }
  ])
  .then(widgets => console.log(`${widgets.length} widgets created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
