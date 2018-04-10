const XlsxPopulate = require('xlsx-populate');
const cleaning = ('./templates/cleaning.xlsx');
let info = {
  "name": "pepito",
  "surname": "perez",
  "cluster": "29",
  "room": "7",
  "key": "yes",
  "car": "no",
  "laundry": "yes",
  "agentmsg": "no charge"
}
  XlsxPopulate.fromFileAsync(cleaning)
      .then(workbook => {
        let map = {
          "name": workbook.sheet("Sheet1").cell("B4"),
          "surname": workbook.sheet("Sheet1").cell("B5"),
          "cluster": workbook.sheet("Sheet1").cell("B6"),
          "room": workbook.sheet("Sheet1").cell("B7"),
          "key": workbook.sheet("Sheet1").cell("B8"),
          "car": workbook.sheet("Sheet1").cell("B9"),
          "laundry": workbook.sheet("Sheet1").cell("B10"),
          "agentmsg": workbook.sheet("Sheet1").cell("B19")
        }
          // Randomly generate 10 rows of data.
          map.name.value(info.name);
          map.surname.value(info.surname);
          map.cluster.value(info.cluster);
          map.room.value(info.room);
          map.key.value(info.key);
          map.car.value(info.car);
          map.laundry.value(info.laundry);
          map.agentmsg.value(info.agentmsg);
        let name = info.cluster + "." + info.room +  " Cleaning todaysDate"
        // Log the value.
        console.log(info);
          return workbook.toFileAsync('./out/' + name + '.xlsx');
      })
      .catch(err => console.error(err));
