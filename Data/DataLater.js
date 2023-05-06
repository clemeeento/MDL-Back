const fs = require("fs");

const fichier = "users.json";

let dataLayer = {

    getAllUsers : function (){
        const users = fs.readFileSync(fichier);
        const tableau = JSON.parse(users);
        return tableau;
    },

    getUsers : function (number, page) {
        {
            let users = fs.readFileSync(fichier);
            let tableau = JSON.parse(users);

            const total = tableau.length;

            if (number && page) {
                tableau = tableau.slice((page - 1) * number, page*number);
            }

            const result = {
                total: total,
                result: tableau
            };

            return result;  
        }
    },
};

module.exports =dataLayer;
