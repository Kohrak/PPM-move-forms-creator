const writeBlue = require('../local/writeBlue'),
      XlsxPopulate = require('xlsx-populate'),
      fs = require('fs');
      
describe("When given a move out input", () => {
    it("creates a form ", (done) => {
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
    writeBlue(info, "01/01/2018", './spec/out/', () => {
        let files = fs.readdirSync('./spec/out/');
        expect(files[0]).toBe("10.2 Cleaning 01.01.2018.xlsx");
        fs.unlink('./spec/out/' + files[0]);
        done();
    }); 
    })
})