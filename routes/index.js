var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = mongoose.model('Task');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// REST Routes //
/////////////////

// Route to get all the tasks
router.get('/tasks', function(req, res, next) {
	Task.find(function(err, tasks) {
		if (err) {
			return next(err);	
		}
		
		res.json(tasks);
	});
});
	
// Route to create a new task
router.post('/tasks', function(req, res, next) {
	var task = new Task(req.body);
	
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

router.get('/tasks/:task', function(req, res) {
	res.json(req.task);
});

router.delete('/tasks/:task', function(req, res, next) {
	Task.findById(req.params.task, function(err, task) {
		if (err) {
			return next(err);	
		}
		
		task.remove(function(err) {
			if (err) {
				return next(err);	
			}
			
			res.sendStatus(204);
		});
	});
});

router.put('/tasks/:task', function(req, res, next) {
	Task.findById(req.params.task, function(err, task) {
		if (err) {
			return next(err);	
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

module.exports = router;