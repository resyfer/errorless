const router = require("express").Router();
const {
  signin,
  signup,
  editDetails,
  getDetails,
} = require("../controllers/user");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:userId", getDetails);
router.put("/:userId", editDetails);

module.exports = router;
