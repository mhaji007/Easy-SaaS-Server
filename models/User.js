const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Schema creates a whitelist of fields
// that rules can be attached to

// If statement prevents model to be defined
// again and again upon import
// if (!User) {
  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        // required: "Name is required",
        maxlength: [150, "Name cannot exceed 150 characters"],
      },
      email: {
        type: String,
        required: "Email is required. Please enter a valid email address",
        // trim: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: "Password is required",
      },
      role: {
        type: Number,
        default: 0,
      },
      avatar_url: {
        type: String,
        default: "",
      },
      images: {
        type: Array,
      }
    },
    { timestamps: true }
  );
  User = mongoose.model("User", userSchema);
// }

module.exports = User;
