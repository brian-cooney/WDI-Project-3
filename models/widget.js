const mongoose = require('mongoose');
const rp = require('request-promise');
mongoose.Promise = require('bluebird');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

// widgetSchema.post('init', function() {
//   const self = this;
//   // console.log(self.url);
//   rp(self.url)
//     .then(data => {
//       self.data = data;
//       console.log('WIDGET: ', self);
//     });
// });

module.exports = mongoose.model('Widget', widgetSchema);
