const express         = require('express');
const router          = express.Router();
const widgets         = require('../controllers/widgets');
const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');

router.route('/widgets')
  .get(widgets.index)
  .post(widgets.new);
router.route('/widgets/:id')
  .get(widgets.show)
  .put(widgets.update)
  .delete(widgets.delete);

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show);

module.exports = router;
