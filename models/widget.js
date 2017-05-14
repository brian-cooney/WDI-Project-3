const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

// widgetSchema.post('init', function() {
//   const self = this;
//   rp({
//     get: self.url
//   })
// })

module.exports = mongoose.model('Widget', widgetSchema);
