const express = require("express"),
      bodyParser = require("body-parser"),
      writeBlue = require("./writeBlue"),
      writeYellow = require("./writeYellow"),
      getDate = require("./getDate"),
      zipFolder = require('zip-folder'),
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

app.get("/zip", (req, res) => {
    zipFolder('./out', './zip/result.zip', (err) => {
        if(err){
            res.send("cant zip files")
        } else {
        res.download("./zip/result.zip", (err) => {
                if (err){
                    res.send("something went wrong")
                } 
            });
        }
    });
})

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
