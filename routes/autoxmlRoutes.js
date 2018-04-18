const fileUpload = require('express-fileupload'),
      autoxml = require('../local/autoxml');

module.exports = (app) => {
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

}