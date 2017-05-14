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
