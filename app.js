const writeBlue = require("./writeBlue");
const writeYellow = require("./writeYellow");
var str = "Tenant: \n clean mess \n broken chair"
let data = {
  "name": "pepito",
  "surname": "perez",
  "cluster": "29",
  "room": "7",
  "key": "yes",
  "car": "no",
  "laundry": "yes",
  "agentmsg": str
};

writeBlue(data);
writeYellow(data);
