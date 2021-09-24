const router = require("express").Router();
const { signin, signup, editDetails } = require("../controllers/user");

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/:userId", editDetails);

module.exports = router;
