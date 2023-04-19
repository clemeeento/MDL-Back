const fs = require("fs");

const fichier = "users.json";

let dataLayer = {

    getAllUsers : function (){
        const users = fs.readFileSync(fichier);
        const tableau = JSON.parse(users);
        return tableau;
    }
};

module.exports =dataLayer;
