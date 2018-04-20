const XlsxPopulate = require('xlsx-populate');
const maintenance = ('./templates/cleaning-kitchen.xlsx');

function writeBuff(info, dateval, next){
    XlsxPopulate.fromFileAsync(maintenance)
      .then(workbook => {
        //map excel sheet cells
        let map = {
          "date": workbook.sheet("Sheet1").cell("B4"),
          "cluster": workbook.sheet("Sheet1").cell("B5"),
          "agentmsg": workbook.sheet("Sheet1").cell("B11")
        }
          // assigns values from info to the cells in map
          map.date.value(dateval);
          map.cluster.value(info.cluster);
          map.agentmsg.value(info.agentmsg);
          let name = info.cluster + " Cleaning (kitchen) " + dateval.replace(/[/]/g, ".");
          // Log the value.

          workbook.toFileAsync('./out/' + name + '.xlsx').then( () => {
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