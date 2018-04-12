const writeBlue = require("./writeBlue");
const writeYellow = require("./writeYellow");
const getDate = require("./getDate");
const csvToJson = require('convert-csv-to-json');
// var str = "Tenant: \n clean mess \n broken chair"
// let data = {
//   "name": "pepito",
//   "surname": "perez",
//   "cluster": "29",
//   "room": "7",
//   "key": "yes",
//   "car": "no",
//   "laundry": "yes",
//   "agentmsg": str
// };

let data = csvToJson.getJsonFromCsv("./input/input.csv");
data.forEach((obj) => {
  obj.name = obj.name + obj.surname;
  writeBlue(obj, getDate());
  writeYellow(obj, getDate());
})

// writeBlue(data, getDate());
// writeYellow(data, getDate());


 
