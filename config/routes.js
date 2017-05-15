const router = require('express').Router();
const widgets = require('../controllers/widgets');

router.route('/widgets')
  .get(widgets.index)
  .post(widgets.create);
router.route('/widgets/:id')
  .get(widgets.show)
  .put(widgets.update)
  .delete(widgets.delete);

module.exports = router;
