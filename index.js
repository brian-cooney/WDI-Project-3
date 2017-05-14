const express    = require('express');
const port       = process.env.PORT || 4000;
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan     = require('morgan');
const cors       = require('cors');
const bodyParser = require('body-parser');
const config     = require('./config/config');
const router     = require('./config/routes');
const app        = express();
const dest       = `${__dirname}/public`;
const expressJWT = require('express-jwt');


mongoose.connect(config.db);

app.use(express.static(dest));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get('env') !== 'production') app.use(cors());


app.use('/api', expressJWT({ secret: config.secret })
.unless({
  path: [
    { url: '/api/login', methods: ['POST'] },
    { url: '/api/register', methods: ['POST'] }
  ]
}));
app.use(jwtErrorHandler);
function jwtErrorHandler(err, req, res, next) {
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request. You must be logged in to view this content' });
}


app.use('/api', router);

app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
// const express    = require('express');
// const mongoose   = require('mongoose');
// const morgan     = require('morgan');
// const bodyParser = require('body-parser');
// const cors       = require('cors');
// const expressJWT = require('express-jwt');
// const app        = express();
// const config     = require('./config/config');
// const routes     = require('./config/routes');
// const dest       = `${__dirname}/public`;
//
// mongoose.connect(config.db);
//
// if (app.get('env') !== 'production') app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(dest));
//
// app.use('/api', expressJWT({ secret: config.secret })
//   .unless({
//     path: [
//       { url: '/api/register', methods: ['POST'] },
//       { url: '/api/login',    methods: ['POST'] }
//     ]
//   }));
// app.use(jwtErrorHandler);
//
// function jwtErrorHandler(err, req, res, next){
//   if (err.name !== 'UnauthorizedError') return next();
//   return res.status(401).json({ message: 'Unauthorized request.' });
// }
//
// app.use('/api', routes);
// app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
//
// app.listen(config.port, () => console.log(`Express has started on port: ${config.port}`));
