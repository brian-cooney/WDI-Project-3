const Widget = require('../models/widget');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function widgetsIndex(req, res) {
  console.log('QUERY: ', req.query);
  const search = Widget.find();
  if (req.query.user) {
    search
      .where({ user: req.query.user })
      .then(widgets => {
        // console.log('FOUND: ', widgets);
        res.json(widgets);
      })
      .catch(err => res.json({ error: err }));
  }
}
function widgetsShow(req, res) {
  Widget
    .findById(req.params.id)
    .then(widget => res.status(200).json(widget))
    .catch(err => res.json({ error: err }));
}
function widgetsCreate(req, res) {
  const widget = new Widget(req.body);
  widget.save(err => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    return res.status(201).json(widget);
  });
}
function widgetsDelete(req, res) {
  Widget.findByIdAndRemove(req.params.id, (err, widget) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!widget) return res.status(404).json({message: 'No widget was found.'});
    return res.status(200).json({message: 'Widget successfully deleted'});
  });
}
function widgetsUpdate(req, res) {
  Widget.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, widget) => {
    if (err) return res.status(500).json({message: 'Something went wrong.'});
    if (!widget) return res.status(404).json({message: 'No widget was found.'});
    return res.status(200).json({message: 'Widget successfully deleted'});
  });
}
module.exports = {
  index: widgetsIndex,
  show: widgetsShow,
  new: widgetsCreate,
  delete: widgetsDelete,
  update: widgetsUpdate
};
