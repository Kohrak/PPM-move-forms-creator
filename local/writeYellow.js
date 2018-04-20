const XlsxPopulate = require('xlsx-populate');
const maintenance = ('./templates/maintenance.xlsx');

function writeYellow(info, dateval, path, next){
    XlsxPopulate.fromFileAsync(maintenance)
      .then(workbook => {
        //map excel sheet cells
        let map = {
          "date": workbook.sheet("Sheet1").cell("B5"),
          "cluster": workbook.sheet("Sheet1").cell("B6"),
          "room": workbook.sheet("Sheet1").cell("B7"),
          "agentmsg": workbook.sheet("Sheet2").cell("A2")
        }
          // assigns values from info to the cells in map
          map.date.value(dateval);
          map.cluster.value(info.cluster);
          map.room.value(info.room);
          map.agentmsg.value(info.agentmsg);
          let name = info.cluster + "." + info.room +  " Maintenance " + dateval.replace(/[/]/g, ".");
          // Log the value.

          workbook.toFileAsync(path + name + '.xlsx').then( () => {
            if (next){
              next();
            }
          }).catch((err) => {
            console.log(err);
          })
      })
      .catch(err => console.error(err));
}

module.exports = writeYellow;