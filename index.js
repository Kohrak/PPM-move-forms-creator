const express = require("express"),
      bodyParser = require("body-parser"),
      fileUpload = require('express-fileupload'),
      app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

require("./routes/roomRoutes")(app);
require("./routes/kitchenRoutes")(app);
require("./routes/downloadRoutes")(app);
require("./routes/autoxmlRoutes")(app);

app.listen(PORT, process.env.IP, function(){
    console.log("Server Started");
})
