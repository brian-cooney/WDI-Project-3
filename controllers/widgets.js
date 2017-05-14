const Widget = require('../models/widget');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function widgetsIndex(req, res) {
  Widget
    .find()
    .exec()
    .then(widgets => {
      res.json(widgets);
    })
    .catch(err => res.json({ message: err }));
}

module.exports = {
  index: widgetsIndex
};
