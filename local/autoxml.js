const writeBlue = require("./writeBlue");
const writeYellow = require("./writeYellow");
const getDate = require("./getDate");
const parser = require('xml2json');
const fs = require('fs');
const emptyFolder = require("./emptyFolder");
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
function autoxml(input){
  fs.readFile(input, function(err, outp) {
    if (err){
      console.log('oh no');
    } else {
      let json = parser.toJson(outp, {object: true});
      let data = json.residentdata.resident
      data.forEach((obj) => {
        obj.name = obj.name + obj.surname;
        writeBlue(obj, getDate());
        writeYellow(obj, getDate());
      })
      emptyFolder("./input/");
    }
  });
}

module.exports = autoxml
// writeBlue(data, getDate());
// writeYellow(data, getDate());


 
