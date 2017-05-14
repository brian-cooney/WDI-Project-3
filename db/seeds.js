const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Widget = require('../models/widget');
const config = require('../config/config');

mongoose.connect(config.db);
Widget.collection.drop();

Widget
  .create([{
    type: 'weather',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d2c4c1492a04ec9081fe74119400cc6e',
    data: {}
  }])
  .then(widgets => console.log(`${widgets.length} widgets created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
