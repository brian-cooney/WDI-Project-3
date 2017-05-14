#WDI Project 3
##Good morning widget aggregator

#Step 1

Setting up the boilerplate:

- using our past projects as a template, set up the basic RESTful route (config, controller, DB, Models):
	-	 Install all of the necessary packages(angular, express, mongoose, bluebird etc)
	-	 Start with creating a Schema for our widgets, as we'll be using this to source our APIs 

```
const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

module.exports = mongoose.model('Widget', widgetSchema);
```

We're using OpenWeather to test that we can get the data through first, and triallingstoring it as a an Object within the Schema. However, do to this, we need a route for our controller and a view.

```
const express = require('express');
const port    = process.env.PORT || 4000;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const config     = require('./config/config');
const router     = require('./config/routes');
const app     = express();
const dest    = `${__dirname}/public`;

mongoose.connect(config.db);

app.use(express.static(dest));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get('env') !== 'production') app.use(cors());
app.use('/api', router);

app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
```

Put a \<h1>Working!\<h1> in you home page to make sure everything's working
Success!

We'll be storing the APIs for our project initially in the local database, so we made a seeds file containing our API (openweather) URL with API key, then tested that work with Insomnia first and then through our browser, getting all the necessary data. 

Seeds:

```
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
```

Controller:

```
const Widget = require('../models/widget');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function widgetsIndex(req, res) {
  Widget
    .find()
    .exec()
    .then(widgets => res.status(200).json(widgets))
    .catch(err => res.json({ message: err }));
}

module.exports = {
  index: widgetsIndex
};
```

Because we want to store all the information for each widget inside that widget itself BEFORE we send it to the front-end for rendering, we need to make the call on the backend.

At the moment, we're just getting the data from the API but we want it to be stored with a name and other user given data so we can style the completed widget on the front end. To do this we employ the help of **Init Hook**, a list of specific instructions to the document as you get it out of the database.