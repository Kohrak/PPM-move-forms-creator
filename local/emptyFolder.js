const fs = require('fs'),
      deleteFile = require('./deleteFile');
      
function emptyFolder(path){
    fs.readdir(path, (err, items) => {
            if(err){
                console.log("something went wrong")
            } else {
                for (var i=0; i<items.length; i++) {
                deleteFile(path + items[i]);
            }
        }
    });
}

module.exports = emptyFolder;