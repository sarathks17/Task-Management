const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    due_date: {
      type: Date,
    },
    status: {
      enum: ["pending", "in-progress", "completed"],
    },
  },
  {
    timestamps: true,
  }
);


const Task = mongoose.model("task",taskSchema)

module.exports = Task;