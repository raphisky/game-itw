// sound
var mic, fft;

// sprites
var character;
var floor;
var ceiling;
var character_direction = 90;
var characterPosX, characterPosY;
var obstacle;
var obstacle_direction = 180;

function setup() {
       createCanvas(windowWidth, windowHeight);

       // Create an Audio input
       mic = new p5.AudioIn();
       fft = new p5.FFT();
       // By default, it does not .connect() (to the computer speakers)
       mic.start(); // start the Audio Input.
       fft.setInput(mic);

       obstacle = createSprite(width - 200, height - 200,200,200);  // create obstacle
       obstacle.setDefaultCollider();

       characterPosX = 200;
       characterPosY = height - 200;
       character = createSprite(characterPosX, characterPosY, 200,200);// create character
       character.setDefaultCollider();

       floor = createSprite(0,height, width, 20);
       ceiling = createSprite(0,0,windowWidth, 20);

}


function draw() {
       background('#1E32C8');

       // Get the overall volume (between 0 and 1.0)
       var vol = mic.getLevel();

       var spectrum = fft.analyze();

       beginShape();
            for (i = 0; i<spectrum.length; i++) {
                // vertex(i, map(spectrum[i], 0, 255, height, 0) );
            }
       endShape();

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, 0, 10);

  // Draw character
  drawSprite(character);
  // character.setSpeed(0.1,character_direction);

  // Draw floor, immovable
  drawSprite(floor);
  floor.immovable = true;
  drawSprite(ceiling);
  ceiling.immovable = true;

  // Draw obstacle
  obstacleSpawn();


  character.collide(obstacle);
  character.collide(floor);
  character.collide(ceiling);
  // character.setVelocity(h,0);
  // character.setSpeed(h, character_direction);
  moveCharacter((h * 3) - 3);

}

function moveCharacter(volume) {
      character.setSpeed(volume, 270);
      character.addSpeed(1.5, 90); // gravity;
}

function obstacleSpawn() {
      drawSprite(obstacle);
      obstacle.setSpeed(2,obstacle_direction);

      if (obstacle.position.x <= 100) {
        obstacle.position.x = width;
        obstacle.setSpeed(2,obstacle_direction);
      }
}
