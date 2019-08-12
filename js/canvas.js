var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

//getting graphics
var pencil = canvas.getContext("2d");

//resizing window
window.addEventListener("resize", ()=>{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

//movement interactive
var mouse ={
	x: undefined,
	y: undefined,
	pgX: undefined,
	pgY: undefined
};
window.addEventListener("mousemove", (event)=>{
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.pgX = event.pageX;
	mouse.pgY = event.pageY;
});
/***/

//max radius
var maxRadius = 100;

function Circle(x, y, rad, dx, dy){
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.size = rad; //this maintain the diameter after enlargement
	this.dx = dx;
	this.dy = dy;

	// colors
	this.red = Math.random() * 255;
	this.green = Math.random() * 255;
	this.blue = Math.random() * 255;
	this.color = "rgb(" +this.red+ ", " +this.green+ ", " +this.blue+ ")";

	this.draw = function () {
		pencil.beginPath();
		pencil.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
		// pencil.strokeStyle = "rgba(" +this.red+ ", " +this.green+ ", " +this.blue+ ", 0.9)" /*"rgba(255, 40, 80, 0.9)"*/;
		pencil.fillStyle = this.color;
		pencil.fill();
		// pencil.stroke();
	}

	this.update = function(){
		if (this.x + this.rad >= innerWidth || this.x - this.rad <= 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.rad >= innerHeight || this.y - this.rad <= 0) {
			this.dy = -this.dy;
		}

		//interactiveness
		if(this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50 || (this.x && this.y == 500)){
			pencil.fillStyle = this.color;
			if(this.rad < maxRadius){
				this.rad += 1;
			}
		}else{
			if (this.rad > this.size){
				this.rad -= 1/2;
			}else if(this.rad <= this.size) {
				this.rad = this.size;
				// pencil.fillStyle = "transparent";
			}
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

var circleArray = [];

//instatiating circle object
for (var i = 0; i < 30; i++) {
	var radius = Math.random() * 14 + 7;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = Math.random() *  1+1;
	var dy = Math.random() * 1+1;

	//color
	// var r = Math.random * 255;
	// var g = Math.random * 255;
	// var b = Math.random * 255;

	circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate(){
	requestAnimationFrame(animate);
	pencil.clearRect(0, 0, innerWidth, innerHeight);

	var circleArrayLength = circleArray.length;
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();