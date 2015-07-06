(function() {
	'use strict';

	angular
		.module('goal')
		.controller('indexController', Controller);

	Controller.$inject = ['$scope', 'tasks'];

	/* @ngInject */
	function Controller($scope, tasks){
		var vm = this;
		vm.property = 'Controller';
		
		vm.tasks = tasks.getTasks();
		vm.nextTaskIndex = tasks.getMostImportantTask();
		
		if (vm.nextTaskIndex !== undefined) {
			vm.nextTask = vm.tasks[vm.nextTaskIndex];
		} else {
			vm.nextTask = undefined;
		}
		
		vm.completedPercentage = 0;
		vm.incompletePercentage =  0;
		
		vm.chart = undefined;
		
		vm.currentDayGrade = currentDayGrade;
		vm.doneNextTask = doneNextTask;
		
		activate();

		////////////////

		function activate() {
			updateStats();
		}
		
		function updateStats() {
			computePercentages();
			drawGraph();	
		}
		
		function drawGraph() {
			// Calculate the size the canvas can be
			var canvasContainer = document.getElementById("graph");
			var width = canvasContainer.offsetWidth;
			var height = canvasContainer.offsetHeight;
			
			width = height = Math.min(width, height);
			
			var canvas = document.getElementById("progress_graph");
			canvas.height = height;
			canvas.width = width;
			
			var data = [
				{
					value: vm.incompletePercentage,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Tasks Incomplete"
				}, {
					value: vm.completedPercentage,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Tasks Complete"
				}
			]

			var options = {
				segmentShowStroke : true,
				segmentStrokeColor : "#fff",
				segmentStrokeWidth : 2,
				percentageInnerCutout : 50,
				animationSteps : 100,
				animationEasing : "easeOutBounce",
				animateRotate : true,
				animateScale : true
			}

			
			vm.chart = new Chart(canvas.getContext("2d")).Pie(data, options);
		}
		
		function doneNextTask() {
			vm.tasks[vm.nextTaskIndex].done = true;
			vm.tasks = tasks.saveTasks(vm.tasks);
			
			vm.nextTaskIndex = tasks.getMostImportantTask();
			if (vm.nextTaskIndex !== undefined) {
				vm.nextTask = vm.tasks[vm.nextTaskIndex];
			} else {
				vm.nextTask = undefined;	
			}
			
			updateStats();
		}
		
		// Get the importance of the current day
		function getDayImportance() {
			var total = 0;

			for (var i = 0; i < vm.tasks.length; i++) {
				total += vm.tasks[i].importance;
			}

			return total;
		}

		// Goes through the goals and adds up the
		// importance of the goals you have finished
		function getDayFinishedImportance() {
			var total = 0;

			for (var i = 0; i < vm.tasks.length; i++) {
				if (vm.tasks[i].done) {
					total += vm.tasks[i].importance;
				}
			}

			return total;
		}
		
		function computePercentages() {
			vm.completedPercentage = 100 * (getDayFinishedImportance() / (getDayImportance() || 1));
			vm.incompletePercentage = 100 - vm.completedPercentage;
		}
		
		function currentDayGrade() {
			return percentageToGrade(vm.completedPercentage);
		}
		
		function percentageToGrade(grade) {
			if (grade < 20) {
				return "F";	
			} else if (grade < 30) {
				return "E";	
			} else if (grade < 40) {
				return "C-";	
			} else if (grade < 50) {
				return "C";	
			}
			
			return "A+";
		}
	}
})();