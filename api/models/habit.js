const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  habits: {
    type: Object,
    required: [true, "Please choose at least one habit!"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  data: {
    type: Array,
  },
});

module.exports = mongoose.model("Habit", HabitSchema);
