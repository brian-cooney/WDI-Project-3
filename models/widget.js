const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String, default: 'white' },
  url: { type: String },
  sizeY: Number,
  sizeX: Number,
  row: Number,
  col: Number,
  data: Object,
  user: String
});

widgetSchema.post('init', function() {
  const self = this;
  rp(self.url)
    .then(response => {
      const data = JSON.parse(response);
      self.data = data;
      // console.log('WIDGET: ', self);
    });
});

module.exports = mongoose.model('Widget', widgetSchema);
