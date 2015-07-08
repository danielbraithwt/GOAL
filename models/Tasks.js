var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	task: String,
	importance: Number,
	done: Boolean
});

mongoose.model("Task", TaskSchema);