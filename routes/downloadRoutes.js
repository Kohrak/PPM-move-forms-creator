const zipFolder = require('zip-folder'),
      fs = require('fs'),
      emptyFolder = require("../local/emptyFolder");


function zip(req, res, next){
    zipFolder('./out', './zip/result.zip', (err) => {
        if(err){
            res.send("cant zip files")
        } else {
            next();
        }
    });
}

module.exports = (app) => {
    app.get("/download", (req, res) => {
        fs.readdir('./out/', (err, items) => {
            if(err){
                res.send("something went wrong");
            } else {
                res.render("download", {files: items});
            }
        })
    })

    app.get("/download/exec", zip, (req, res) => {
        res.download("./zip/result.zip", (err) => {
            if (err){
                res.send("something went wrong");
            } else {
                emptyFolder('./zip/');
                emptyFolder('./out/');
            }
        });
    })
    
    app.get("/download/templates/kitchen", (req, res) => {
        res.download("./templates/xml/kitchenmap.xml", (err) => {
            if (err){
                res.send("can't download the file, try again");
            } else {
                console.log("kitchen template downloaded");
            }
        })
    })
    
    app.get("/download/templates/room", (req, res) => {
        res.download("./templates/xml/residentmap.xml", (err) => {
            if (err){
                res.send("can't download the file, try again");
            } else {
                console.log("room template downloaded");
            }
        })
    })
}

