const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  color: { type: String, default: 'white' },
  url: { type: String, required: true },
  sizeY: Number,
  sizeX: Number,
  row: Number,
  col: Number,
  description: String,
  data: { type: Object, default: {} },
  user: String
});

widgetSchema.post('init', function() {
  const self = this;
  rp(self.url)
  .then(response => {
    const data = JSON.parse(response);
    self.data = data;
    // if (self.data.type !== undefined) {
      // if (self.data.type === 'events') {
    //     var newDesc = self.data.events.event[0].description.replace(/(<([^>]+)>)/ig, '');
    //     console.log('******************NEW DESC', newDesc);
    //     console.log('*****************DESCRIPTION', self.data.events.event[0].description);
    //     self.description = newDesc;
      // }
    // }
    // console.log('WIDGET: ', self);
  })
  .then(() => self.save());
});

module.exports = mongoose.model('Widget', widgetSchema);
