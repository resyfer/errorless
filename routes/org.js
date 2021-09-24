const router = require('express').Router();

const { instiDetails } = require('../controllers/org');

router.get('/:id', instiDetails);

module.exports = router;
