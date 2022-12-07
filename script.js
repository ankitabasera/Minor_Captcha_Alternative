let n1 =  Math.floor(Math.random() * 9);
let temp =  9 - n1;
let n2 =  Math.floor(Math.random() * temp);
let ans = n1 + n2;
let ques = document.getElementById("question");
let quesText = "What is " + n1 + " + " + n2 + " ?";
ques.innerHTML = quesText;
console.log(ans);

 let speak = () => {
	setTimeout(() => {
		//speechSynthesis.cancel();
		//window.speechSynthesis.cancel();
		//const synth = window.speechSynthesis;
		let msg = new SpeechSynthesisUtterance();
		msg.text = quesText;
		console.log(msg.text);
		window.speechSynthesis.speak(msg);
	}, 3000);
}


window.onload = () => {
	speak();
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    
    // Fill Window Width and Height
    // myCanvas.width = window.innerWidth;
	// myCanvas.height = window.innerHeight;
	
	// Set Background Color
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
	
    // Mouse Event Handlers
	if(myCanvas){
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = 4;
		
		$(myCanvas)
		.mousedown(function(e){
			isDown = true;
			ctx.beginPath();
			canvasX = e.pageX - myCanvas.offsetLeft;
			canvasY = e.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			ctx.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {

			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);

			this.started = true;

		},
		move: function(evt) {

			if (this.started) {
				ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				ctx.strokeStyle = "#000";
				ctx.lineWidth = 5;
				ctx.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
};