const router = require('express').Router();
const widgets = require('../controllers/widgets');

router.route('/widgets')
  .get(widgets.index);

module.exports = router;
