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

  transfers[0].message=iota.utils.toTrytes('THE CUBE FUCKING ROCKS. Number: '+number)
  iota.api.sendTransfer(trytes, 3, 14, transfers, (error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })

  number++;
  setTimeout(start, DELAY);
}

start()