const express = require("express"),
      bodyParser = require("body-parser"),
      fileUpload = require('express-fileupload'),
      autoxml = require('./local/autoxml'),
      app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

require("./routes/roomRoutes")(app);
require("./routes/kitchenRoutes")(app);
require("./routes/downloadRoutes")(app);


//csv input modes
app.get("/xml", (req, res) => {
    res.render("xml");
})

app.post("/xml", (req, res) => {
    let inputfile = req.files.dataxml;
    inputfile.mv('./input/input.xml', (err) => {
        if (err){
            res.send("oh no");
        } else {
            autoxml('./input/input.xml');
            res.redirect("/");
        }
    })
})

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
