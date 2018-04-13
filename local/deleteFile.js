const fs = require('fs');

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