const XlsxPopulate = require('xlsx-populate');
const cleaning = ('./templates/cleaning.xlsx');

function writeBlue(info, dateval, download){
    XlsxPopulate.fromFileAsync(cleaning)
      .then(workbook => {
        //map excel sheet cells
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
          // assigns values from info to the cells in map
          map.date.value(dateval);
          map.name.value(info.name);
          map.cluster.value(info.cluster);
          map.room.value(info.room);
          map.key.value(info.key);
          map.car.value(info.car);
          map.laundry.value(info.laundry);
          map.agentmsg.value(info.agentmsg);
          let name = info.cluster + "." + info.room +  "-Cleaning-" + dateval.replace(/[/]/g, ".");
          // Log the value.
          
          return workbook.toFileAsync('./out/' + name + '.xlsx');
      })
      .catch(err => console.error(err));
}

module.exports = writeBlue;
