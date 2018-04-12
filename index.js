const express = require("express"),
      bodyParser = require("body-parser"),
      writeBlue = require("./writeBlue"),
      writeYellow = require("./writeYellow"),
      getDate = require("./getDate"),
      zipFolder = require('zip-folder'),
      fs = require('fs'),
      app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index", {date: getDate()})
})

app.post("/", (req, res) => {
    writeBlue(req.body.info, req.body.dateval);
    writeYellow(req.body.info, req.body.dateval);
    res.redirect("/");
})

app.get("/download", zip, (req, res) => {
    res.download("./zip/result.zip", (err) => {
                if (err){
                    res.send("something went wrong")
                } else {
                    deleteFile('./zip/result.zip');
                    emptyout('./out/');
                }
            });
})

function zip(req, res, next){
    zipFolder('./out', './zip/result.zip', (err) => {
        if(err){
            res.send("cant zip files")
        } else {
            next();
        }
    });
}

function deleteFile (file) { 
    fs.unlink(file, function (err) {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' deleted');
        }
    });
}

function emptyout(path){
    fs.readdir(path, function(err, items) {
        if(err){
            console.log("something went wrong")
        } else {
            for (var i=0; i<items.length; i++) {
            deleteFile(path + items[i]);
        }

    }
});
}


app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
