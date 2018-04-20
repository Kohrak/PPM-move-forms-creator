const fs = require('fs');
//Deletes a file form the server file system
function deleteFile (file){ 
    fs.unlink(file, (err) => {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' deleted');
        }
    });
}

module.exports = deleteFile;