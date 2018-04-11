const express = require("express"),
      bodyParser = require("body-parser"),
      writeBlue = require("./writeBlue"),
      writeYellow = require("./writeYellow"),
      getDate = require("./getDate"),
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

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
