const parser = require('xml2json'),
      fs = require('fs'),
      writeGreen = require("./writeGreen"),
      writeBuff = require("./writeBuff"),
      getDate = require("./getDate"),
      emptyFolder = require("./emptyFolder");

function autoxmlK(input){
  fs.readFile(input, function(err, outp) {
    if (err){
      console.log('oh no');
    } else {
      let json = parser.toJson(outp, {object: true});
      let data = json.kitchendata.kitchen
      data.forEach((obj) => {
        obj.name = obj.name + obj.surname;
        writeGreen(obj, getDate());
        writeBuff(obj, getDate());
      })
      emptyFolder("./input/");
    }
  });
}

module.exports = autoxmlK



 
