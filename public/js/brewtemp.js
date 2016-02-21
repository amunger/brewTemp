'use strict'

$(function (){
	var socket = io.connect();
	var series = new TimeSeries();
	
	socket.on('reading', function (reading){
		var temp = $('<li>' + reading.temp + '</li>');
		$('.temp-list').append(temp);
		series.append(reading.time, reading.temp);
	});
	
	function myYRangeFunction(range) {
		var min = 50;
		var max = 215;
		return {min: min, max: max};
	};
	
	var chart = new SmoothieChart({millisPerPixel:100,
		scaleSmoothing:0.115,
		grid:{millisPerLine:6000,verticalSections:20},
		//timestampFormatter:SmoothieChart.timeFormatter,
		yRangeFunction:myYRangeFunction});
		
    var canvas = document.getElementById('smoothie-chart');
    

	chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#00ff00'});
	chart.streamTo(canvas, 1415);
});

