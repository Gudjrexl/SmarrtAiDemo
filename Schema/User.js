const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const weaponSchema = new mongoose.Schema({
  name: String,
  totalGiven: Number,
  used: Number,
  remaining: Number
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Army Officer" },

    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    rank: { type: String, default: "Cadet" },

    weapons: [weaponSchema],

    totalPoints: { type: Number, default: 0 },
    terroristKills: { type: Number, default: 0 },
    civilianKills: { type: Number, default: 0 },

    currentPlace: { type: String, default: "" },
    visitedPlaces: [String]
  },
  { timestamps: true }
);

// hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model("User", userSchema);
