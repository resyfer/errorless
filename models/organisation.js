const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	crew: [mongoose.SchemaTypes.ObjectId],
});

const orgModel = mongoose.model('org', orgSchema);

export default orgModel;
