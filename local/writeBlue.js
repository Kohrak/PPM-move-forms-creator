const XlsxPopulate = require('xlsx-populate');
const cleaning = ('./templates/cleaning.xlsx');

/*The function will take the cleaning template (aka Blue) 
and return a copy of it with the passed data in the respective cells*/
function writeBlue(info, dateval, path, next){
     if (arguments.length < 3 || !info.room || !info.cluster){
       if (next){
          next(); 
       } else {
         return false;
       }
     } else {
      XlsxPopulate.fromFileAsync(cleaning)
        .then(workbook => {
          //map excel sheet template cells
          let map = {
            "name": workbook.sheet("Sheet1").cell("B4"),
            "date": workbook.sheet("Sheet1").cell("B5"),
            "cluster": workbook.sheet("Sheet1").cell("B6"),
            "room": workbook.sheet("Sheet1").cell("B7"),
            "key": workbook.sheet("Sheet1").cell("B8"),
            "car": workbook.sheet("Sheet1").cell("B9"),
            "laundry": workbook.sheet("Sheet1").cell("B10"),
            "agentmsg": workbook.sheet("Sheet1").cell("B19")
          }
            // assign values from info to the cells in map
            info.date = dateval;
            for (let prop in map){
              map[prop].value(info[prop]);
            }
            // Creates the name using the provided data
            // format <cluster>.<room> Cleaning dd/mm/yy
            let name = info.cluster + "." + info.room +  " Cleaning " + dateval.replace(/[/]/g, ".");
            // Write the form in the server file system on the provided path
            workbook.toFileAsync(path + name + '.xlsx').then( () => {
              //call the callback if provided
              if(next){
                next();
              }
            }).catch((err) => {
              console.log(err);
            })
        })
        .catch(err => console.error(err));
    }
}

module.exports = writeBlue;
