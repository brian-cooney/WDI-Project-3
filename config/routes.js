const express         = require('express');
const router          = express.Router();
const widgets         = require('../controllers/widgets');

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');



router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/widgets')
  .get(widgets.index);

module.exports = router;
