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
  description: String,
  data: { type: Object, default: {} },
  user: String,
  index: { type: Number, default: 0 }
});

const colors = ['#f26c4f', '#fff568', '#7cc576', '#8560a8', '#f06eaa'];

function randomColor() {
  const random = Math.floor(Math.random() * 5);
  return colors[random];
}

widgetSchema.pre('save', function(next) {
  const self = this;
  if (self.isNew) {
    rp(self.url)
    .then(response => {
      const data = JSON.parse(response);
      self.color = randomColor();
      self.data = data;
      console.log('SAVED', this.type);
    })
    .then(() => next());
  }
});

widgetSchema.post('init', function() {
  const self = this;
  console.log('ACCESSED', this.type);
  rp(self.url)
  .then(response => {
    const data = JSON.parse(response);
    self.data = data;
    // console.log('WIDGET: ', self);
  });
});


module.exports = mongoose.model('Widget', widgetSchema);
