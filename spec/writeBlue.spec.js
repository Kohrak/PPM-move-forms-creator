const writeBlue = require('../local/writeBlue'),
      XlsxPopulate = require('xlsx-populate'),
      fs = require('fs');
      
describe("When given a move out input", () => {
    it("creates a form with the right name using input data", (done) => {
         let info = {
          "name": "Jack",
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
    });
    it("creates a form that contains the data passed in the right places", (done) => {
         let info = {
          "name": "Jack",
          "cluster": "10",
          "room": "2",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
    writeBlue(info, "01/01/2018", './spec/out/', () => {
        XlsxPopulate.fromFileAsync('./spec/out/10.2 Cleaning 01.01.2018.xlsx')
        .then(workbook => {
            let p = workbook.sheet('Sheet1');
            let map = {
                "name": p.cell('B4').value(),
                "cluster": p.cell('B6').value(),
                "room": p.cell('B7').value(),
                "key": p.cell('B8').value(),
                "car": p.cell('B9').value(),
                "laundry": p.cell('B10').value(),
                "agentmsg": p.cell('B19').value()
            }
            for (let prop in map){
                expect(map[prop].toString()).toEqual(info[prop]);
            }
            expect(p.cell('B5').value()).toEqual("01/01/2018");
            let files = fs.readdirSync('./spec/out/');
            fs.unlink('./spec/out/' + files[0]);
            done();
        })
        .catch(err => {
            expect(false).toBe(true);
            done();
            })
    }); 
    });
    
})