const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String, default: 'white' },
  url: { type: String, required: true },
  sizeY: Number,
  sizeX: Number,
  minSizeY: Number,
  minSizeX: Number,
  row: Number,
  col: Number,
  data: { type: Object, default: {} },
  user: String,
  index: { type: Number, default: 0 }
});

widgetSchema.pre('save', function(next) {
  const self = this;
  if (self.isNew) {
    rp(self.url)
    .then(response => {
      const data = JSON.parse(response);
      self.data = data;
      // console.log('WIDGET: ', self);
    })
    .then(() => next());
  }

});

widgetSchema.post('init', function() {
  const self = this;
  rp(self.url)
  .then(response => {
    const data = JSON.parse(response);
    self.data = data;
    // console.log('WIDGET: ', self);
  })
  .then(() => self.save());
});


module.exports = mongoose.model('Widget', widgetSchema);
