require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes import
const userRoutes = require("./routes/user");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const app = express();

    // middlewares
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).send("Hello World");
    });

    app.use("/api/user", userRoutes);

    app.listen(process.env.PORT, () => {
      console.log(
        `Server connected at port ${process.env.PORT} in mode ${process.env.NODE_ENV}`
      );
    });
  } catch (err) {
    console.log(err);
  }
})();
