
const express = require("express"),
      bodyParser = require("body-parser"),
      zipFolder = require('zip-folder'),
      fs = require('fs'),
      fileUpload = require('express-fileupload'),
      getDate = require("./local/getDate"),
      autocsv = require('./local/autocsv'),
      writeBlue = require("./local/writeBlue"),
      writeYellow = require("./local/writeYellow"),
      writeGreen = require("./local/writeGreen"),
      writeBuff = require("./local/writeBuff"),
      deleteFile = require("./local/deleteFile"),
      emptyFolder = require("./local/emptyFolder"),
      app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.redirect("/room");
})

//routes Blue and Yellow forms
app.get("/room", (req, res) => {
    res.render("room", {date: getDate()})
})

app.post("/room", (req, res) => {
    writeBlue(req.body.info, req.body.dateval);
    writeYellow(req.body.info, req.body.dateval);
    res.redirect("/room");
})

//routes for Buff and Green forms
app.get("/kitchen", (req, res) => {
    res.render("kitchen", {date: getDate()})
})

app.post("/kitchen", (req, res) => {
    writeGreen(req.body.info, req.body.dateval);
    writeBuff(req.body.info, req.body.dateval);
    res.redirect("/kitchen");
})

//Download routes

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
            res.send("something went wrong")
        } else {
            emptyFolder('./zip/');
            emptyFolder('./out/');
        }
    });
})


//csv input modes
app.get("/csv", (req, res) => {
    res.render("csv");
})

app.post("/csv", (req, res) => {
    let inputfile = req.files.datacsv;
    inputfile.mv('./input/input.csv', (err) => {
        if (err){
            res.send("oh no");
        } else {
            autocsv('./input/input.csv');
            emptyFolder('./input/');
            res.redirect("/");
        }
    })
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

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
