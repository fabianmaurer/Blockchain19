var Gpio = require('onoff').Gpio;
// Configure GPIO pin 21 for input and rising edge detection
var pir = new Gpio(21,'in','both');

// Add the edge detection callback to catch the motion detection events
pir.watch(function(err, value) {
  if (value === 1) {
    // The pin went high
    console.log("Motion Detected: %d", value);
    start();
  }
  else{
      console.log("value not ONE BUt instead: "+value)
  }
});


function exit() {
  console.log("Exiting");
  pir.unexport();
  process.exit();
}

process.on('SIGINT', exit);

console.log("Monitoring...");

const IOTA = require("iota.lib.js") 
const iota = new IOTA({provider: "https://nodes.thetangle.org:443"})
//const remoteCurl = require('@iota/curl-remote')
//remoteCurl(iota, `https://powbox.testnet.iota.org`, 500)

const DELAY = 60000


iota.api.getNodeInfo((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })


const trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
const message = iota.utils.toTrytes('THE CUBE FUCKING ROCKS')
const transfers = [
  {
    value: 0,
    address: trytes,
    message: message
  }
]
var number= 0

function start() {
  
  console.log("Starting... Number: "+number)

  transfers[0].message=iota.utils.toTrytes('THE CUBE FUCKING ROCKS. #'+number +" Time: "+getTime())
  iota.api.sendTransfer(trytes, 3, 14, transfers, (error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })

  number++;
  //setTimeout(start, DELAY);
}

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
  
  }
