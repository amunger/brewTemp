'use strict'

$(function (){
	var socket = io.connect();
	var series = new TimeSeries();

	function convertTemp(voltage) {
		const m = 0.25;
		const b = -4.66667;

		var result = voltage * m + b;
		return Math.round(result);
	}

	socket.on('reading', function (reading){
		var convertedTemp = convertTemp(reading.temp);
		$('#current-reading').html(convertedTemp);
		series.append(reading.time, convertedTemp);
	});

	function myYRangeFunction(range) {
		var min = 50;
		var max = 220;
		return {min: min, max: max};
	};

	var chart = new SmoothieChart({millisPerPixel:900,
		scaleSmoothing:0.115,
		grid:{millisPerLine:60000,verticalSections:17},
		//timestampFormatter:SmoothieChart.timeFormatter,
		yRangeFunction:myYRangeFunction});

    var canvas = document.getElementById('smoothie-chart');


	chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#00ff00'});
	chart.streamTo(canvas, 1415);
});
