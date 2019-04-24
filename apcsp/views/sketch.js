let start, characFall, charac, drone, balloonBlue, balloonGrey, balloonOrange, windowLeft, windowRight, paperAirplane, clothes1, clothes2, clothes3;
let startClicked = false;
let charFalling = false;
let charx = -25, chary = 325;
let charfx = -100, charfy = 1000;
let startx, starty;
let dronex = -100, droney = -100;
let leftrectx, leftrecty, leftrectw, leftrecth;
let rightrectx = 1100, rightrecty = 0, rightrectw = 100, rightrecth = 750;
let ledgey = 800;
let controlsEnabled = false;
let droneEnabled = false, droneReset = false;
let dronextarget, droneytarget;
var i = 0;
let balloonBluex = -1000, balloonBluey = -1000;
let balloonGreyx = -1000, balloonGreyy = -1000;
let balloonOrangex = -1000, balloonOrangey = -1000;
let windowy = -1000;
let airplanex = 0;
let clothes1y = -1000;
let clothes2y = -1000;
let clothes3y = -1000;

function preload(){
	start = loadImage("/images/start.png");
	characFall = createImg("/images/characfallGif.gif");
	charac = createImg("/images/characGif.gif");
	drone = createImg("/images/drone.gif");
	balloonBlue = loadImage("/images/balloonBlue.png");
	balloonGrey = loadImage("/images/balloonGrey.png");
	balloonOrange = loadImage("/images/balloonOrange.png");
	windowLeft = loadImage("/images/windowLeft.png");
	windowRight = loadImage("/images/windowRight.png");
	paperAirplane = createImg("/images/paperAirplane.gif");
	clothes1 = loadImage("/images/clothes1.png");
	clothes2 = loadImage("/images/clothes2.png");
	clothes3 = loadImage("/images/clothes3.png");
}
function setup() {
	createCanvas(1000, 750);
	background('black');
	startx = 400;
	starty = 325;
	
}

function draw() {
	// console.log(frameCount);
	var initseconds;
	fill(color("#8a3335"));
	noStroke();
	background('black');
	paperAirplane.size(100, 100);
	paperAirplane.position(airplanex, windowy);
	characFall.size(25, 50);
	characFall.position(charfx, charfy);
	charac.size(25, 50);
	charac.position(charx, chary);
	drone.size(100, 100);
	drone.position(dronex, droney);
	
	image(balloonBlue, balloonBluex, balloonBluey, 100, 100);
	image(balloonGrey, balloonGreyx, balloonGreyy, 100, 100);
	image(balloonOrange, balloonOrangex, balloonOrangey, 100, 100);
	
	image(clothes1, 100, clothes1y);
	image(clothes2, 100, clothes2y);
	image(clothes3, 100, clothes3y);
	
	image(start, startx, starty);
	rect(leftrectx, leftrecty, leftrectw, leftrecth);
	rect(rightrectx, rightrecty, rightrectw, rightrecth);
	
	image(windowLeft, 80, windowy);
	image(windowRight, 895, windowy);
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
		hitbox(dronex, droney);
		console.log(frameCount);
		if (frameCount % 1000 == 0){
			console.log("100");
			i = 0;
			droneReset = false;
			droneCall();
		}
		
		if(droneReset == true){
			droney -= 20;
			droneEnabled = false;
		}
		if(droneReset == false){
			if (dronex < dronextarget){
				dronex += 5;
			}
			if (dronex > dronextarget){
				dronex -= 5;
			}
			if (droney < droneytarget){
				droney += 5;
			}
			if (droney > droneytarget){
				droney -= 5;
			}
			if( (dronex > (dronextarget - 10)) && (dronex < (dronextarget + 10)) && (droney > (droneytarget - 10)) && (dronex < (dronextarget + 10)) ){
			dronex = dronextarget;
			droney = droneytarget;
			}
			if ((dronex == dronextarget) && (droney == droneytarget)){
				droneEnabled = true;
				droneCall();
				i++;
			}
		}
		

		//clothesline
		if (frameCount % 400 == 0){
			clothesCall();
		}
		
		clothes1y -= 10;
		clothesHit(360, 687, clothes1y);
		//between 360 and 687
		
		clothes2y -= 10;
		clothesHit(237, 535, clothes2y);
		//between 237 and 535
		
		clothes3y -= 10;
		clothesHit(123, 405, clothes3y);
		//between 123 and 405
		
		//paper airplane
		hitbox(airplanex, windowy);
		if (frameCount % 700 == 0){
			windowy = 750;
			airplanex = 0;
		}
		
		airplanex += 15;
		if (airplanex == 900){
			airplanex = -1000;
		}
		windowy -= 10;
		//balloon
		hitbox(balloonBluex, balloonBluey);
		hitbox(balloonGreyx, balloonGreyy);
		hitbox(balloonOrangex, balloonOrangey);
		if (frameCount % 300 == 0){
			balloonCall();
		}
		balloonBluey -= 5;
		balloonGreyy -= 5;
		balloonOrangey -= 5;
	}
}

function mouseClicked(){
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

function droneCall(){
	if (droneEnabled == false){
		dronex = Math.floor(Math.random()*900) + 100;
		droney = 750;
		dronextarget = Math.floor(Math.random()*900) + 100;
		droneytarget = Math.floor(Math.random()*750);
		// console.log("1 s");
	}
	if (droneEnabled == true){
		if (i < 3){
			dronextarget = Math.floor(Math.random()*825) + 100;
			droneytarget = Math.floor(Math.random()*675);
			console.log(dronextarget);
			console.log(droneytarget);
		} else {
			droneytarget = -1000;
			droneReset = true;
		}
	}
	
}

function balloonCall(){
	let randThree = Math.floor(random(0, 3));
	if(randThree == 0){
		balloonBluex = Math.floor(Math.random()*800) + 100;
		balloonBluey = 750;
	} else if(randThree == 1){
		balloonGreyx = Math.floor(Math.random()*800) + 100;
		balloonGreyy = 750;
	} else if(randThree == 2){
		balloonOrangex = Math.floor(Math.random()*800) + 100;
		balloonOrangey = 750;
	}
}

function clothesCall(){
	let randThree = Math.floor(random(0, 3));
	if(randThree == 0){
		clothes1y = 750;
	} else if(randThree == 1){
		clothes2y = 750;
	} else if(randThree == 2){
		clothes3y = 750;
	}
}

function hitbox(x, y){
	if( (x > 100) && (x<900) && (y>0) && (y<750)){
		if( ((charfx > x) && (charfx < (x+100))) && ((charfy > y) && (charfy < x+100)) ){
			console.log("contact");
			noLoop();
		}
	}
}

function clothesHit(xmin, xmax, clothesyvar){
	if( ((charfx < 100 + xmin) || (charfx > (xmax + 100)))  && ((charfy > clothesyvar) && (charfy < clothesyvar + 100))){
			console.log("contact");
			noLoop();
	}
}