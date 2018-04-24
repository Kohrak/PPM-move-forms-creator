const writeGreen = require('../local/writeGreen'),
      XlsxPopulate = require('xlsx-populate'),
      fs = require('fs'),
      specpath = './spec/out/';
      
describe("When giving a cluster move out input", () => {
    it("Creates a Green form with the correct name and format", (done) => {
        let info = {
          "cluster": "10",
          "agentmsg": "No charge"
        }
        writeGreen(info, "01/01/2018", specpath, () => {
        let files = fs.readdirSync(specpath);
        expect(files[0]).toBe("10 Maintenance (kitchen) 01.01.2018.xlsx");
        fs.unlink(specpath + files[0]);
        done();
        })
    })
    it("Creates a Green form with the data passed in the right places", (done) => {
        let info = {
          "cluster": "10",
          "agentmsg": "No charge"
        }
        writeGreen(info, "01/01/2018", specpath, () => {
            XlsxPopulate.fromFileAsync('./spec/out/10 Maintenance (kitchen) 01.01.2018.xlsx')
            .then(book => {
                let pointer = book.sheet("Sheet1");
                let map = {
                    "cluster": pointer.cell("B5").value(),
                    "agentmsg": pointer.cell("B12").value(),
                    "date": pointer.cell("B4").value()
                }
                expect(map.cluster.toString()).toEqual(info.cluster);
                expect(map.agentmsg).toEqual(info.agentmsg);
                expect(map.date).toEqual("01/01/2018");
                let files = fs.readdirSync(specpath);
                fs.unlink(specpath + files[0]);
                done();
                
            })
            .catch(err => {
                expect(false).toBe(true);
                done();
            })
        })
    })
    
})