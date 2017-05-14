const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

module.exports = mongoose.model('Widget', widgetSchema);
