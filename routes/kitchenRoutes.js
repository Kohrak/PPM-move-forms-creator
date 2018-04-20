const writeGreen = require("../local/writeGreen"),
      getDate = require("../local/getDate"),
      writeBuff = require("../local/writeBuff");
      
module.exports = (app) => {
    //routes for Buff and Green forms
    app.get("/kitchen", (req, res) => {
        res.render("kitchen", {date: getDate()})
    })
    
    app.post("/kitchen", (req, res) => {
        writeGreen(req.body.info, req.body.dateval, './out/', () => {
            writeBuff(req.body.info, req.body.dateval, './out/', () => {
                res.redirect("/kitchen"); 
            })
        });
    })
}      
