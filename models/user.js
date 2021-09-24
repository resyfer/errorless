const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    photo: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/QUfxC0hzy8wY3P_vb0DmUw0Mj1DlhRgLAxd8YXMeHMq32vbUQkj9WRkdnnLp1PvUHQTKJxVIdjaLJobnRJb_-9BPQ0Pa3Phy3kFMRVxWgq75hkIHEa7D2Sx0FfqMxYqxOVQ6m-7NUBVp7ZeC5Go-QEcNe6OJi-nmlFgDlHo0ot90w7uQpW_Zz_0yVRAZ72lOwMmRdNjsMP09HXRy97GWnROHfcm9iPYBq8sMeLP0EsuERM_h-swQeNgP_1pjHy4uTWJMBlMEcO46dejSEhjAWQdTRjFmiPwd7X_mmAqll_aQcq0h92zv7cY7_KqE88ogkZyjo2t47g54wN_uw5Kavw999qHS4u_sT7oWA3V8oYPMQLpmotdgR-54oSJHauT0ZpIxuBbz7AtCt2EnMmHZB6mSqkx2Esq_N2rm9oBPTvmVtZj3d419YUEfEf9IwgGUxkDwbNEtnN9GlhWbXRJHqbqqgVZtzCZKNDEr9XECwBVlKj4sSP6SqkF4bWKaDL7pJseTHra8bhEhFekzaomziEAQln4QFKITf2EX6WLyKVjc8piaKE3PnQN4Ec7tpSSqF9pmHcv-Cma0-uZhxqeeK-FAsW3bVfbapmmW2pfdK_8GeUn8jhVaJUZGeLcPA6R9dSmmGRC6AXyABoE1uNN8qvYqAQRlf7UycvBRE75_Gi_Xrfa02D_FR8evZ9kIkDDy0kFR9fsi01o_rF9D-VETruQ=s225-no",
    },
    status: {
      type: String,
      enum: ["Healthy", "Infected", "Missing in Action"],
      default: "Healthy",
    },
    phoneNo: {
      type: Number,
      default: null,
    },
    history: {
      type: [
        {
          date: Date,
          event: String,
        },
      ],
    },
    vaccinationStatus: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    organisation: {
      orgId: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
        default: "",
      },
      designation: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
