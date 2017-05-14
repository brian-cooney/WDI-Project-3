const Widget = require('../models/widget');
const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

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

module.exports = {
  index: widgetsIndex
};
