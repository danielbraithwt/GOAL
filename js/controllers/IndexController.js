(function() {
	'use strict';

	angular
		.module('goal')
		.controller('indexController', Controller);

	Controller.$inject = ['$scope'];

	/* @ngInject */
	function Controller($scope){
		var vm = this;
		vm.property = 'Controller';
		

		vm.completedPercentage = 20;
		vm.incompletePercentage = 80;
		
		vm.chart = undefined;
		
		vm.currentDayGrade = currentDayGrade;
		
		activate();

		////////////////

		function activate() {
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
					label: "Percent Of Tasks Incomplete"
				}, {
					value: vm.completedPercentage,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Percent Of Tasks Complete"
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