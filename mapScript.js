var $ = function(id) { return document.getElementById(id); };

var image = $('image');
var canvas = $('canvas');

var day = "all";

image.addEventListener('load', redrawDots);

var dots = [];

var changeDay = function(newDay)
{
	day = newDay;
}

var addDot = function(x, y, color, day, name)
{
	dots.push({x, y, color, day, name});
}

var redrawDots = function()
{
	var drawnLocsX = [];
	var drawnLocsY = [];
	var drawnLocsName = [];
	
	canvas.width = image.width;
	canvas.height = image.height;
	
	var draw = canvas.getContext('2d');
	
	const dotRadius = 8;
	
	for(var i = 0; i < dots.length; i++)
	{
		if(day == "all" || day == dots[i].day)
		{
			var dotX = (image.width * dots[i].x);
			var dotY = (image.height * dots[i].y);
			
			draw.beginPath();
			draw.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
			draw.fillStyle = dots[i].color;
			draw.fill();
			draw.closePath();
		}
	}
	
	for(var i = 0; i < dots.length; i++)
	{
		if(day == "all" || day == dots[i].day)
		{
			var dotX = (image.width * dots[i].x);
			var dotY = (image.height * dots[i].y);
			
			var times = 0;
			for(var j = 0; j < drawnLocsX.length; j++)
			{
				if(dots[i].x == drawnLocsX[j] && dots[i].y == drawnLocsY[j] 
				   && dots[i].name != drawnLocsName[j])
					times++;
			}
			
			const textWidth = draw.measureText(dots[i].name).width;
			
			var textXOffset = 0;
			var textYOffset = 0;
			if(times == 1)
			{
				textXOffset = -1 - dotRadius - textWidth/2;
				textYOffset = - dotRadius*2;
			}
			else if(times == 2)
			{
				textXOffset = -3 - dotRadius*2 - textWidth;
				textYOffset = 0;
			}
			else if(times == 3)
			{
				textXOffset = -1 - dotRadius - textWidth/2;
				textYOffset = dotRadius*2;
			}
			
			draw.fillStyle = "GhostWhite";
			draw.font = "bold 8px serif";
            draw.fillRect(dotX + dotRadius + 1 + textXOffset, dotY - dotRadius / 2 + textYOffset, textWidth + 1, dotRadius + 1);
			
			draw.fillStyle = dots[i].color;
			draw.fillText(dots[i].name, dotX + dotRadius + 1 + textXOffset, dotY + dotRadius/2 + textYOffset);
			
			drawnLocsX.push(dots[i].x);
			drawnLocsY.push(dots[i].y);
			drawnLocsName.push(dots[i].name);
		}
	}
}

// for when resizing window
window.addEventListener('resize', redrawDots);