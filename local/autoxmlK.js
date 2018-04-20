const parser = require('xml2json'),
      fs = require('fs'),
      writeGreen = require("./writeGreen"),
      writeBuff = require("./writeBuff"),
      getDate = require("./getDate"),
      emptyFolder = require("./emptyFolder");

/*The function will take input from xml file, the template for it is provided.
then it will call the functions to write Buff and Green forms with each
line of the input*/

function autoxmlK(input, path){
  fs.readFile(input, function(err, outp) {
    if (err){
      console.log('oh no');
    } else {
      let json = parser.toJson(outp, {object: true});
      let data = json.kitchendata.kitchen
      data.forEach((obj) => {
        obj.name = obj.name + obj.surname;
        writeGreen(obj, getDate(), path);
        writeBuff(obj, getDate(), path);
      })
      emptyFolder("./input/");
    }
  });
}

module.exports = autoxmlK



 
