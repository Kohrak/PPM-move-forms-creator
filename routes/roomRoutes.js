const writeBlue = require("../local/writeBlue"),
      getDate = require("../local/getDate"),
      writeYellow = require("../local/writeYellow");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.redirect("/room");
    })

    //routes Blue and Yellow forms
    app.get("/room", (req, res) => {
        res.render("room", {date: getDate()})
    })
    
    app.post("/room", (req, res) => {
        writeBlue(req.body.info, req.body.dateval, () => {
            writeYellow(req.body.info, req.body.dateval, () => {
                res.redirect("/room");
            })
        });
    });

}
