const router = require("express").Router();

const {
  instiDetails,
  getAllInsti,
  signin,
  signup,
} = require("../controllers/org");

router.get("/", getAllInsti);
router.get("/:id", instiDetails);
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
