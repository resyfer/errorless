require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('DB Connected');

		const app = express();
		app.use(cors());

		if (process.env.NODE_ENV === 'production') {
			app.get('/', (req, res) => {
				res
					.status(200)
					.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
			});
		} else {
			app.get('/', (req, res) => {
				res.status(200).send('Hello World');
			});
		}

		app.listen(process.env.PORT, () => {
			console.log(
				`Server connected at port ${process.env.PORT} in mode ${process.env.NODE_ENV}`
			);
		});
	} catch (err) {
		console.log(err);
	}
})();
