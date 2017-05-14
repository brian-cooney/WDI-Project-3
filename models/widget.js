const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String },
  data: Object
});

// widgetSchema.pos('init', function() {
//   const self = this;
//   rp({
//     get:
//   })
// })

module.exports = mongoose.model('Widget', widgetSchema);
