var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	user_id: String,
	task: String,
	importance: Number,
	done: Boolean
});

mongoose.model("Task", TaskSchema);