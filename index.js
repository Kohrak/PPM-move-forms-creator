const express = require("express"),
      bodyParser = require("body-parser"),
      fileUpload = require('express-fileupload'),
      //autocsv = require('./local/autocsv'),
      app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

require("./routes/roomRoutes")(app);
require("./routes/kitchenRoutes")(app);
require("./routes/downloadRoutes")(app);


//csv input modes
// app.get("/csv", (req, res) => {
//     res.render("csv");
// })

// app.post("/csv", (req, res) => {
//     let inputfile = req.files.datacsv;
//     inputfile.mv('./input/input.csv', (err) => {
//         if (err){
//             res.send("oh no");
//         } else {
//             autocsv('./input/input.csv');
//             emptyFolder('./input/');
//             res.redirect("/");
//         }
//     })
// })

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
