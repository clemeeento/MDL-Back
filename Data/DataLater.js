const fs = require("fs");

const fichier = "./Data/users.json";

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

    delCustomer: function(id) {
        let tableau = JSON.parse(fs.readFileSync(fichier, "utf-8"));
        const index = tableau.find(c => c.id == id);
        if (index !== -1) {
            tableau.splice(index.id - 1, 1); 
            const keys = Object.keys(tableau);
            const length = keys.length;
            for (let i = index.id - 1; i < length; i++)
            {
                tableau[i].id = tableau[i].id - 1; 
            }
            fs.writeFileSync(fichier, JSON.stringify(tableau)); 
        }
        return tableau;
    },

    modifCustomer : function(newCustomer){
        let tableau = JSON.parse(fs.readFileSync(fichier, "utf-8"));

        const id = tableau.find(c => c.id == newCustomer.id);

        id.last = newCustomer.last;
        id.first = newCustomer.first;
        id.email = newCustomer.email;
        id.country = newCustomer.country;
        id.company = newCustomer.company;

        fs.writeFileSync(fichier, JSON.stringify(tableau), (error) => {
            if(error) throw error;
        });

        return tableau;
    },

    addCustomers : function(newCustomer){
        let data = fs.readFileSync(fichier, "utf-8");
        let added = JSON.parse(data);

        added.push(newCustomer);
       
        fs.writeFileSync(fichier, JSON.stringify(added), (error) => {
            if(error) throw error;
        });
        
        return added;
    },

};

module.exports =dataLayer;
