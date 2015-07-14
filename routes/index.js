var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({secret: process.env.GOAL_SECRET, userProperty: 'payload'});

var passport = require('passport');

var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

// REST Routes //
/////////////////

// Route to get all the tasks
router.get('/tasks', auth, function(req, res, next) {
	console.log(req.payload._id);
	Task.find({user_id: req.payload._id}, function(err, tasks) {
		if (err) {
			console.log(err);
			return next(err);	
		}

		res.json(tasks);
	});
});

// Route to create a new task
router.post('/tasks', auth, function(req, res, next) {
	var task = new Task(req.body);
	task.user_id = req.payload._id;

	task.save(function(err, task) {
		if (err) {
			return next(err);	
		}

		res.json(task);
	});
});

// Route to preload a task object
router.param('post', function(req, res, next, id) {
	var query = Task.findById(id);

	query.exec(function(err, task) {
		if(err) {
			return next(err);
		}

		if (!task) {
			return next(new Error("Cant find task"));	
		}

		req.task = task;
		return next();
	});
});

router.get('/tasks/:task', auth, function(req, res) {
	res.json(req.task);
});

// For deleting a task
router.delete('/tasks/:task', auth, function(req, res, next) {
	Task.findById(req.params.task, function(err, task) {
		if (err) {
			return next(err);	
		}
		
		// Ensure that there is a task
		if (!task) {
			return next(new Error("Cant find task"));	
		}
		
		// Ensure that the user has permition to delete the task
		if (task.user_id !== req.payload._id) {
			return res.status(401);
		}

		task.remove(function(err) {
			if (err) {
				return next(err);	
			}

			res.sendStatus(204);
		});
	});
});

// For updating a task
router.put('/tasks/:task', auth, function(req, res, next) {
	Task.findById(req.params.task, function(err, task) {
		if (err) {
			return next(err);	
		}
		
		// Ensure that there is a task
		if (!task) {
			return next(new Error("Cant find task"));	
		}
		
		// Ensure that the user has permition to delete the task
		if (task.user_id !== req.payload._id) {
			return res.status(401);
		}

		task.done = req.body.done;

		task.save(function(err) {
			if (err) {
				return next(err);	
			}

			res.json(task);
		});
	});
});

router.post('/register', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all the fields'});	
	}
	
	var user = new User();
	
	user.username = req.body.username;
	user.setPassword(req.body.password);
	
	user.save(function(err) {
		if (err) {
			return res.status(400).json({message: 'User allready exsists'});
		}
		
		return res.json({token: user.generateJWT()});
	});
});

router.post('/login', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all the fields'});	
	}
	
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);	
		}
		
		if (user) {
			return res.json({token: user.generateJWT()});	
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;