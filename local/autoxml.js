const parser = require('xml2json'),
      fs = require('fs'),
      writeBlue = require("./writeBlue"),
      writeYellow = require("./writeYellow"),
      getDate = require("./getDate"),
      emptyFolder = require("./emptyFolder");

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



 
