const orgModel = require("../models/organisation");

const instiDetails = async (req, res) => {
  const orgId = req.params.id;

  const org = await orgModel.findById(orgId);

  res.status(200).json({
    org,
  });
};

const getAllInsti = async (req, res) => {
  const organisations = await orgModel.find();
  const data = organisations.map((o) => ({
    organisation: o.name,
    orgId: o._id,
  }));
  res.json(data);
};

module.exports = {
  instiDetails,
  getAllInsti,
};
