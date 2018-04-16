const XlsxPopulate = require('xlsx-populate');
const maintenance = ('./templates/maintenance-kitchen.xlsx');

function writeGreen(info, dateval){
    XlsxPopulate.fromFileAsync(maintenance)
      .then(workbook => {
        //map excel sheet cells
        let map = {
          "date": workbook.sheet("Sheet1").cell("B4"),
          "cluster": workbook.sheet("Sheet1").cell("B5"),
          "agentmsg": workbook.sheet("Sheet1").cell("B12")
        }
          // assigns values from info to the cells in map
          map.date.value(dateval);
          map.cluster.value(info.cluster);
          map.agentmsg.value(info.agentmsg);
          let name = info.cluster + " Maintenance (kitchen) " + dateval.replace(/[/]/g, ".");
          // Log the value.

          return workbook.toFileAsync('./out/' + name + '.xlsx');
      })
      .catch(err => console.error(err));
}

module.exports = writeGreen;