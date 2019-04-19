let start;
let startClicked = false;
let charac;
let charFalling = false;
let charx = -25, chary = 325;
let charfx = -100, charfy = 1000;
let startx, starty;
let leftrectx, leftrecty, leftrectw, leftrecth;
let rightrectx = 1100, rightrecty = 0, rightrectw = 100, rightrecth = 750;
let ledgey = 800;
let controlsEnabled = false;
function preload(){
	start = loadImage("/images/start.png");
	characFall = createImg("/images/characfallGif.gif");
	charac = createImg("/images/characGif.gif");
}
function setup() {
	createCanvas(1000, 750);
	background('black');
	startx = 400;
	starty = 325;
	
}

function draw() {
	var initseconds;
	fill(color("#8a3335"));
	noStroke();
	background('black');
	console.log(charFalling);
	characFall.size(25, 50);
	characFall.position(charfx, charfy);
	charac.size(25, 50);
	charac.position(charx, chary);
	
	image(start, startx, starty);
	rect(leftrectx, leftrecty, leftrectw, leftrecth);
	rect(rightrectx, rightrecty, rightrectw, rightrecth);
	if ((startClicked == true) && (controlsEnabled == false)){
		startx = -100;
		starty = -100;
		charx += 3;
		//character reaches middle of screen
		if (charx >= 487.5){
			charx = 487.5;
			leftrectw -= 3;
			//character reaches edge of building
			if (leftrectw <= 512.5){
				// leftrectw = 512.5;
				//charcter jumps and building moves to side
				chary -= 3;
				leftrectw -= 3; // need to make this more parabolic
				if (chary <= 100){
					chary = 100;
				}
				if (leftrectw <= 200){
					rightrectx -= 3;
					if (leftrectw <= 100){
						leftrectw = 100;
					}
					if (rightrectx <= 900){
						rightrectx = 900;
						
						charfx = 487.5;
						charfy = 100;
						charx = -100;
						chary = -100;
						
						charFalling = true;
					}
				}
				
			}
		}
	}
	if (charFalling == true){
		leftrecty -= 3;
		if (leftrecty <= 0){
			leftrecty = 0;
			//Actual controls
			controlsEnabled = true;
		}
	}

	if (controlsEnabled == true){
		
		//Controls
		if (keyIsDown(UP_ARROW)){
			charfy -= 10;
		}
		if (keyIsDown(DOWN_ARROW)){
			charfy += 10;
		}
		if (keyIsDown(LEFT_ARROW)){
			charfx -= 10;
		}
		if (keyIsDown(RIGHT_ARROW)){
			charfx += 10;
		}
		
		//Character boundaries
		if (charfx <= 110){
			charfx = 110;
		}
		if (charfx >= 875){
			charfx = 875;
		}
		if (charfy <= 10){
			charfy = 10
		}
		if (charfy >= 700){
			charfy = 700;
		}
		
		//ledge animation
		
		fill(color("#b7ada3"));
		noStroke();
		rect(0, ledgey, 100, 50);
		rect(900, ledgey, 100, 50);
		ledgey -= 10;
		if (ledgey <= -10){
			ledgey = 800;
		}
		
		//drone
		
		//clothesline
		
		//paper airplane
		
		//token
		
	}
}

function mouseClicked(){
	console.log(mouseX, mouseY);
	if ((mouseX > 400) && (mouseX < 600) && (mouseY>325) && (mouseY < 425)){
		startClicked = true;
		leftrectx = 0;
		leftrecty = 375;
		leftrectw = 1000;
		leftrecth = 750;
	}
}

function characterAnimation(){
	if (charFalling == true){
		return characFall;
	} else if (charFalling == false){
		return charac;
	}
}