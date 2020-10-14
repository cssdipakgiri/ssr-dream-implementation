var container = document.querySelectorAll(".container")[0];



function showRespect(){
	var body = document.querySelectorAll("body")[0];
	body.innerHTML = `
	<img id='ssr' onclick='document.location.reload();' style='width:100%; opacity: 0;' src='images/ssr.png'>
	`;
	var imgssr = document.querySelectorAll("img#ssr")[0];
	imgssr.animate([{
		"opacity": "0"
	},{
		"opacity": "1"
	}], 1000)
	setTimeout(function(){
		imgssr.style.opacity = "1";
	}, 1000)
	
}

var canvas = document.querySelectorAll("canvas")[0];


var context = canvas.getContext("2d");


class Velocity{
	constructor(vel){
		this.currentV = vel;
	}
	setCurrentVelocity(new_vel){
		this.currentV = new_acc;
	}
	getCurrentVelocity(){
		return  this.currentV;
	}
}
class Acceleration{
	constructor(acc){
		this.currentA = acc;
	}
	setCurrentAcceleration(new_acc){
		this.currentA = new_acc;
	}
	getCurrentAcceleration(){
		return  this.currentA;
	}
}

class Engine{
	constructor(data){
		this.currentX = data.init_x;
		this.currentY = data.init_y;
		this.velocity = data.velocity;
		this.acceleration = data.acceleration;
		this.deltaT = 1000;
	}
	run(){
		


		this.currentX += 1*this.velocity;
		this.currentY += 1*this.velocity;
		this.velocity += this.acceleration;


		return {
			currentX: this.currentX,
			currentY: this.currentY,
			velocity: this.velocity,
			acceleration: this.acceleration
		};
	}
}

class Rocket{
	constructor(data, deltaT){
		this.currentX = data.init_x;
		this.currentY = data.init_y;
		this.velocity = new Velocity(data.velocity).getCurrentVelocity();
		this.acceleration = new Acceleration(data.acceleration).getCurrentAcceleration();
		var interval = setInterval(() => {
			this.update();

		}, deltaT)
	
	}


	update(){
		
		
		var EngineData = new Engine({
			init_x: this.currentX,
			init_y: this.currentY,
			velocity: this.velocity,
			acceleration: this.acceleration
		}).run();
		this.currentX = EngineData.currentX;
		this.currentY = EngineData.currentY;
		this.velocity = EngineData.velocity;
		this.acceleration = EngineData.acceleration;
	}
	getX(){
		return this.currentX;
	}
	getY(){
		return this.currentY;
	}
	getCurrentPosition(){
		return [this.getX(), this.getY()];	
	}
	
}


// again it's implemented code!

var global_id;

var rocketDotPng = document.querySelectorAll("img")[0];
rocketDotPng.width = canvas.width/2;


var global_time = 0; 

var roundTowPointFloat = (fs) => parseFloat((fs + "").slice(0, (fs + "").indexOf(".") + 3));

var initialized = false;

var rocket;

function Draw(){

	if(!initialized){

		rocket = new Rocket({
			init_x: 50.00,
			init_y: canvas.height,
			velocity: -0.8,
			acceleration: -0.5
		}, 300)
		initialized = true;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);

	
	context.strokeStyle = "red";
	context.fillStyle = "lightblue";
	context.rect(0, 0, canvas.width, canvas.height)
	context.fill();


	context.fillStyle = "green";

	context.fillText("[x: " + 0 + ", y: " + 0 + ", z: " +  roundTowPointFloat( parseFloat(canvas.height - rocket.getY())) + "]", canvas.width/2 + canvas.width*0.060 - 25, rocket.getY() - 60, 1000)


	context.fillStyle = "red";

	context.fillText(`instanteneus states:`, canvas.width*0.05, canvas.height*0.4)

	context.fillText(`height: ${roundTowPointFloat( parseFloat(canvas.height - rocket.getY()))}`, canvas.width*0.05, canvas.height*0.5)

	context.fillText(`velocity: ${roundTowPointFloat( -1*rocket.velocity)}`, canvas.width*0.05, canvas.height*0.6)

	context.fillText(`acceleration: ${roundTowPointFloat( -1* rocket.acceleration)}`, canvas.width*0.05, canvas.height*0.7)

	context.fillText(`time: ${global_time}s`, canvas.width*0.05, canvas.height*0.8)

	context.fillText(`gravity: ${0}`, canvas.width*0.05, canvas.height*0.9)





	context.drawImage(rocketDotPng, canvas.width/2 - 25, rocket.getY() - 50, 50, 100);	
	
	global_id = window.requestAnimationFrame(Draw);

}



var playButton = document.querySelectorAll("button#playButton")[0];
var restartButton = document.querySelectorAll("button#restartButton")[0];


document.querySelectorAll("button").forEach( button => {
	button.onclick = function(){
		switch(button.id[3]){
			case "playButton"[3]:
				Draw();
				setInterval(function(){
					global_time += 1;
				}, 1000)


				setTimeout(function(){
	
					container.animate([{
						"opacity": "1"
					}, {	
						"opacity": "0"
					}], 700)

				setTimeout(function(){
					container.style.display = "none";
				}, 730)
				showRespect();
				},10000)

				break;
			case "restartButton"[3]:
				window.cancelAnimationFrame(global_id);
				document.location.reload();
				break;
			default:
				break;
		}
	}
})
