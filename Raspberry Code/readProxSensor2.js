var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({io: new raspi()});
board.on('ready', function() {
  var motion = new five.Motion('P1-21');
  motion.on('motionstart', function() {
    // Run raspistill command to take a photo with the camera module  
    // then detect cats from the photo
    console.log("MOVEMENT")
  })
});