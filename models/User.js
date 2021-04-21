const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcrypt");

// Schema creates a whitelist of fields
// that rules can be attached to

// If statement prevents model to be defined
// again and again upon import

let User;
if (!User) {
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
      },
    },
    { timestamps: true }
  );

  userSchema.pre("save", function (next) {
    // Refernce to the user object
    // saved to the database
    const user = this;
    const SALT_FACTOR = parseInt(process.env.SALT_FACTOR);
    // Encrypt only when the password is changed
    // Check whether password field in user model has changed
    if (!user.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });

  User = mongoose.model("User", userSchema);
}

module.exports = User;
