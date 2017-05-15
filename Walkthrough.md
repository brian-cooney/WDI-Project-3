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

In our case, it works a little bit llike a PreSave: so the controller gets the widget from the database, then beore the controller renders the response the Init function runs and modifies it to put the data from the API into the data object within the Schema.

We initially tried putting the init hook in the model file but it was rendering properly, so we moved it to the Controller file instead and it works.

```
function widgetsIndex(req, res) {
  let thisWidget;
  Widget
    .findOne()
    .exec()
    .then(widget => {
      thisWidget = widget;
      rp(widget.url)
        .then(response => {
          const data = JSON.parse(response);
          thisWidget.data = data;
          res.status(200).json(widget);
        })
        .catch(err => res.json({ message: err }));
    });

}
```

This way, when we call ```localhost:4000/api/widgets``` we get our data parsing through.

Now that our API data is being retrieved and passed through correctly we can now start adding more APIs.

```
Widget
  .create([{
    type: 'weather',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d2c4c1492a04ec9081fe74119400cc6e',
    data: {}
  }, {
    type: 'news',
    url: 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=220bcdb5f5bd425194e8e6914bf03244', 
    data: {}
  }])
  .then(widgets => console.log(`${widgets.length} widgets created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
```

###ROADBLOCK!
Now we've hit an issue: In our Controller, we can't use findOne as it will only retrieve the first of our seeded data, and using find all would require us to loop over it every time it came out of the database. To fix this, we had to move the init hook back ito the models file and customise the request:

```
const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

widgetSchema.post('init', function() {
  const self = this;
  // console.log(self.url);
  rp(self.url)
    .then(response => {
      const data = JSON.parse(response);
      self.data = data;
      // console.log('WIDGET: ', self);
    });
});

module.exports = mongoose.model('Widget', widgetSchema);
```

And the controller function should now look like:

```
function widgetsIndex(req, res) {
  Widget
    .find()
    .exec()
    .then(widgets => {
      res.json(widgets);
    })
    .catch(err => res.json({ message: err }));
}
```

##Authentication
Adding anuglar authentication proved troublesome as the lesson notes were incomplete, so we 

##Gridster Implementation
So for our app we want users to be able to and drag their widgets across the screen to their liking, and Gridster was recommended to us.

Gridster is basically a jQuery library specifically designed for the task, and we're using an angular version of it. 

The first step is to download and install ```angular-gridster``` through Bower in the terminal, then load it in the angular module in the app.js (by writing 'angular-gridster' into the array. 
















 

