const writeYellow = require('../local/writeYellow'),
      XlsxPopulate = require('xlsx-populate'),
      fs = require('fs'),
      specpath = './spec/out/';
      
describe("When given a move out input", () => {
    it("creates a yellow form with the right name using input data", (done) => {
         let info = {
          "name": "Jack",
          "cluster": "10",
          "room": "2",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
    writeYellow(info, "01/01/2018", specpath, () => {
        let files = fs.readdirSync(specpath);
        expect(files[0]).toBe("10.2 Maintenance 01.01.2018.xlsx");
        fs.unlink(specpath + files[0]);
        done();
    }); 
    });
    it("creates a yellow form that contains the data passed in the right places", (done) => {
         let info = {
          "name": "Jack",
          "cluster": "10",
          "room": "2",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
    writeYellow(info, "01/01/2018", specpath, () => {
        XlsxPopulate.fromFileAsync('./spec/out/10.2 Maintenance 01.01.2018.xlsx')
        .then(workbook => {
            let p = workbook.sheet('Sheet1');
            let map = {
                "cluster": p.cell('B6').value(),
                "room": p.cell('B7').value(),
                "agentmsg": workbook.sheet('Sheet2').cell('A2').value()
            }
            for (let prop in map){
                expect(map[prop].toString()).toEqual(info[prop]);
            }
            expect(p.cell('B5').value()).toEqual("01/01/2018");
            let files = fs.readdirSync(specpath);
            fs.unlink(specpath + files[0]);
            done();
        })
        .catch(err => {
            expect(false).toBe(true);
            done();
            })
    }); 
    });
    it("won't create a yellow form if there is no room or cluster parameter", (done) => {
        let info = {
          "name": "Jack",
          "cluster": "6",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
        writeYellow(info, "01/01/2018", specpath, () => {
        let files = fs.readdirSync(specpath);
        expect(files.length).toEqual(0);
        files.forEach((file) => {
            fs.unlink(specpath + file);
        });
        done();
        })
    });
    it("won't crash if there is no room or cluster parameter and no callback", () => {
        let info = {
          "name": "Jack",
          "key": "Yes",
          "car": "Na",
          "laundry": "Yes",
          "agentmsg": "No charge"
        }
        expect(writeYellow(info, "01/01/2018", specpath)).toBe(false);
        let files = fs.readdirSync(specpath);
        expect(files.length).toEqual(0);
        files.forEach((file) => {
            fs.unlink(specpath + file);
        });
    });
    it("won't create a blue form or crash if not enough parameters are passed", () => {
        expect(writeYellow()).toBe(false);
        let files = fs.readdirSync(specpath);
        expect(files.length).toEqual(0);
        files.forEach((file) => {
            fs.unlink(specpath + file);
        });
    });
})