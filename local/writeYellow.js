const XlsxPopulate = require('xlsx-populate');
const maintenance = ('./templates/maintenance.xlsx');

/*The function will take the maintenance template (aka Yellow) 
and return a copy of it with the passed data in the respective cells*/
function writeYellow(info, dateval, path, next){
    if (arguments.length < 3 || !info.room || !info.cluster){
       if (next){
          next(); 
       } else {
         return false;
       }
     } else {
      XlsxPopulate.fromFileAsync(maintenance)
        .then(workbook => {
          //map excel sheet template cells
          let map = {
            "date": workbook.sheet("Sheet1").cell("B5"),
            "cluster": workbook.sheet("Sheet1").cell("B6"),
            "room": workbook.sheet("Sheet1").cell("B7"),
            "agentmsg": workbook.sheet("Sheet2").cell("A2")
          }
            // assign values from info to the cells in map
            info.date = dateval;
            for (let prop in map){
              map[prop].value(info[prop]);
            }
            // Creates the name using the provided data
            // format <cluster>.<room> Maintenance dd/mm/yy
            let name = info.cluster + "." + info.room +  " Maintenance " + dateval.replace(/[/]/g, ".");
            // Write the form in the server file system on the provided path
            workbook.toFileAsync(path + name + '.xlsx').then( () => {
              //call the callback if provided
              if (next){
                next();
              }
            }).catch((err) => {
              console.log(err);
            })
        })
        .catch(err => console.error(err));
     }
}

module.exports = writeYellow;