const XlsxPopulate = require('xlsx-populate');
const maintenance = ('./templates/cleaning-kitchen.xlsx');

/*The function will take the kitchen cleaning template (aka Buff) 
and return a copy of it with the passed data in the respective cells*/

function writeBuff(info, dateval, path, next){
    XlsxPopulate.fromFileAsync(maintenance)
      .then(workbook => {
        //map excel sheet template cells
        let map = {
          "date": workbook.sheet("Sheet1").cell("B4"),
          "cluster": workbook.sheet("Sheet1").cell("B5"),
          "agentmsg": workbook.sheet("Sheet1").cell("B11")
        }
          // assign values from info to the cells in map
          map.date.value(dateval);
          map.cluster.value(info.cluster);
          map.agentmsg.value(info.agentmsg);
          // Creates the name using the provided data
          // format <cluster> Cleaning (kitchen) dd/mm/yy
          let name = info.cluster + " Cleaning (kitchen) " + dateval.replace(/[/]/g, ".");
          // Write the form in the server file system on the provided path
          workbook.toFileAsync(path + name + '.xlsx').then( () => {
            //call callback if provided
            if(next){
              next();
            }
          }).catch((err) => {
            console.log(err);
          })
      })
      .catch(err => console.error(err));
}

module.exports = writeBuff;