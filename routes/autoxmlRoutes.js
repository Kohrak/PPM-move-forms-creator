const fileUpload = require('express-fileupload'),
      autoxml = require('../local/autoxml'),
      autoxmlK = require('../local/autoxmlK');

module.exports = (app) => {

    app.post("/xml/rooms", (req, res) => {
        let inputfile = req.files.dataxml;
        inputfile.mv('./input/input.xml', (err) => {
            if (err){
                res.send("oh no");
            } else {
                autoxml('./input/input.xml', './out/');
                res.redirect("/");
            }
        })
    })

    app.post("/xml/kitchen", (req, res) => {
        let inputfile = req.files.dataxml;
        inputfile.mv('./input/input.xml', (err) => {
            if (err){
                res.send("oh no");
            } else {
                autoxmlK('./input/input.xml', './out/');
                res.redirect("/");
            }
        })
    })

}