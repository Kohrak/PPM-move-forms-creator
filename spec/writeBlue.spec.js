const writeBlue = require('../local/writeBlue'),
      XlsxPopulate = require('xlsx-populate'),
      fs = require('fs');
      
describe("When given a move out input", () => {
    it("creates a form with the provided input", () => {
         let info = {
          "name": "Jack",
          "date": "Smith",
          "cluster": "10",
          "room": "2",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
    writeBlue(info, "01/01/2018", './out/', () => {
        fs.readdir('./out/', (err, items) => {
            if(err){
                console.log("something went wrong")
            } else {
                expect(items.length).toBe(1);
            }
        })   
    })   
    })
})