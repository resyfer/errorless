const router = require("express").Router();
const {
  signin,
  signup,
  editDetails,
  getDetails,
  getAllHistory,
  updateHistory,
} = require("../controllers/user");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:userId", getDetails);
router.put("/:userId", editDetails);
router.get("/:userId/history", getAllHistory);
router.put("/:userId/history", updateHistory);

module.exports = router;
