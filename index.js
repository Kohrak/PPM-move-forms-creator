const express = require("express"),
      bodyParser = require("body-parser"),
      writeBlue = require("./writeBlue"),
      writeYellow = require("./writeYellow"),
      app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", (req, res) => {
    writeBlue(req.body.info);
    writeYellow(req.body.info);
    res.redirect("/");
})

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
