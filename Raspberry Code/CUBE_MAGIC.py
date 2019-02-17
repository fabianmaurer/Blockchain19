# Imports some Python Date/Time functions
import time
import datetime

# Imports GPIO library
import RPi.GPIO as GPIO

# Imports the PyOTA library
from iota import Iota, ProposedTransaction, ProposedBundle, Address, Tag, TryteString



iotaNode = "https://nodes.thetangle.org:443"

api = Iota(iotaNode, seed=b"ZXRC9JXEOPAUUCC9IOGIZIGWAOMQWRWURXMMUVCBGYYECUISWQZESHWDBASTGJUAIQOVIWEOCRUJKXPZL")

print(api.get_node_info())

#################
trytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
message = iota.utils.toTrytes('YourMessage')
transfers = [
  {
    value: 0,
    address: trytes,
    message: message
  }
]
#################
iota.api.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success)
  }
})
