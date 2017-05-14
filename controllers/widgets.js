const Widget = require('../models/widget');
const mongoose = require('mongoose');
// const rp = require('request-promise');
mongoose.Promise = require('bluebird');

function widgetsIndex(req, res) {
  Widget
    .findOne()
    .exec()
    .then(widget => {
      res.status(200).json(widget);
    })
    .catch(err => res.json({ message: err }));
}

module.exports = {
  index: widgetsIndex
};
