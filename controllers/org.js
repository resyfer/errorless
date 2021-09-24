const orgModel = require('../models/organisation');

const instiDetails = async (req, res) => {
	const orgId = req.params.id;

	const org = await orgModel.findById(orgId);

	res.status(200).json({
		org,
	});
};

module.exports = {
	instiDetails,
};
