const router = require("express").Router();

const { instiDetails, getAllInsti } = require("../controllers/org");

router.get("/", getAllInsti);
router.get("/:id", instiDetails);

module.exports = router;
