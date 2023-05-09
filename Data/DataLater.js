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
            tableau.splice(index.id - 1, 1); // Supprimer une entrée à l'index spécifié
            const keys = Object.keys(tableau);
            const length = keys.length;
            for (let i = index.id - 1; i < length; i++)
            {
                tableau[i].id = tableau[i].id - 1; // Décrémenter l'ID de chaque entrée dans le tableau
            }
            fs.writeFileSync(fichier, JSON.stringify(tableau)); // Écrire les données mises à jour dans le fichier
        }
        return tableau;
    },

    modifCustomer : function(newCustomer){
        // Lit le fichier JSON et le parse en objet
        let tableau = JSON.parse(fs.readFileSync(fichier, "utf-8"));
        // trouver l'index du client à modifier
        const id = tableau.find(c => c.id == newCustomer.id);
        // effectuer les modifications nécessaires
        id.last = newCustomer.last;
        id.first = newCustomer.first;
        id.email = newCustomer.email;
        id.country = newCustomer.country;
        id.company = newCustomer.company;
        // enregistrer les modifications dans le fichier JSON
        fs.writeFileSync(fichier, JSON.stringify(tableau), (error) => {
            if(error) throw error;
        });
        return tableau;
    },
    addCustomers : function(newCustomer){
        // Lit le fichier JSON et ajoute à un client à la fin de celui-ci
        let data = fs.readFileSync(fichier, "utf-8");
        let added = JSON.parse(data);
        added.push(newCustomer);
        // Enregistre le fichier JSON
        fs.writeFileSync(fichier, JSON.stringify(added), (error) => {
            if(error) throw error;
        });
        // Le retourne
        return added;
    },

};

module.exports =dataLayer;
