const fs = require("fs");
const readlineSync = require("readline-sync"); //Pour pouvoir récuperer les input utilisateurs
const chalk = require("chalk"); //Pour mettre de la couleur dans le terminal

const fichier = "./Data/users.json";

function CreationTableau()
{
    let users = fs.readFileSync(fichier); //Importer le fichier
    let tableau = JSON.parse(users);  //Recupérer le tableau du fichier
    return tableau;
}

function Pays()
{
    var liste = new Map;
    const tableau = CreationTableau();

    //Parcourir le tableau en enregistrant les pays dans une map et en incrémentant la valeur pour ceux déja présents
    for(var i=0;i<tableau.length; i++)
    {

        if (liste.has(tableau[i].country)) //Cas où le pays est déja dans la map
        {
            liste.set(tableau[i].country, liste.get(tableau[i].country) + 1);   //Incrémentation de la valeur
        }
        else //Cas où le pays n'est pas dans la map
        {
            liste.set(tableau[i].country,1);    //Ajouter le nouveau pays en lui donnant une valeurs de 1
        }

    }

    console.log(liste);
}


function Societes()
{
    var liste = new Map;
    const tableau = CreationTableau();

    //Parcourir le tableau en enregistrant les sociétés dans une map et en incrémentant la valeur pour ceux déja présents
    for(var i=0;i<tableau.length; i++)
    { 

        if (liste.has(tableau[i].company)) //Cas où la société est déja dans la map
        {
            liste.set(tableau[i].company, liste.get(tableau[i].company) + 1); //Incrémentation de la valeur
        }

        else //Cas où la société n'est pas dans la map
        {
            liste.set(tableau[i].company,1); //Ajouter la nouvelle société en lui donnant une valeur de 1
        }

    }

    console.log(liste);
}

function CreationID()
{
    var id;
    const tableau = CreationTableau();
    var taille=tableau.length;
    id=tableau[taille-1].id +1;
    return id;
}

function CreationUtilisateur()
{
    const created = new Date();

    const email = readlineSync.question(chalk.red("EMail : "));
    const first = readlineSync.question(chalk.red("\nPrenom : "));
    const last = readlineSync.question(chalk.red("\nNom : "));
    const company =readlineSync.question(chalk.red("\nSocietes : "));
    const country =readlineSync.question(chalk.red("\nPays : "));  

    let user = {
        id: CreationID(),
        email: email,
        first: first,
        last: last,
        company: company,
        created_at: created,
        country: country
    };

    return user;
}

function AjouterUtilisateur()
{
    let tableau=CreationTableau();
    let user=CreationUtilisateur();

    tableau.push(user);
    fs.writeFileSync(fichier, JSON.stringify(tableau), (error) => {
        if(error) throw error;
    });
    return 0;
}

function modifierUtilisateur()
{
    let tableau=CreationTableau();

    console.log(chalk.red("Quel est l'id ? \n"));
    const id = parseInt(readlineSync.question(""));

    const modif  = tableau.find(c => c.id == id);

    modif.email = readlineSync.question(chalk.red("EMail : "));
    modif.first = readlineSync.question(chalk.red("\nPrenom : "));
    modif.last = readlineSync.question(chalk.red("\nNom : "));
    modif.company =readlineSync.question(chalk.red("\nSocietes : "));
    modif.country =readlineSync.question(chalk.red("\nPays : "));  
    
    fs.writeFileSync(fichier, JSON.stringify(tableau), (error) => {
        if(error) throw error;
    });
}

function supprimerUtilisateur()
{
    let tableau=CreationTableau();

    console.log(chalk.red("Quel est l'id ? \n"));
    const id = parseInt(readlineSync.question(""));

    const index = tableau.find(c => c.id == id);
    if (index !== -1) 
    {
        tableau.splice(index.id - 1, 1); 
        const keys = Object.keys(tableau);
        const length = keys.length;
        for (let i = index.id - 1; i < length; i++)
        {
            tableau[i].id = tableau[i].id - 1; 
        }
        fs.writeFileSync(fichier, JSON.stringify(tableau)); 
    }
}

function afficher()
{
    let choix = 0;
    while(choix!=6)
    {
        console.log(chalk.blue("Quel est votre choix : \n\
        1 : Liste des sociétés \n\
        2 : Liste des Pays \n\
        3 : Ajouter Utilisateur \n\
        4 : Modifier Utilisateur \n\
        5 : Supprimer Utilisateur" ));
        console.log(chalk.green("        6 : Quitter \n "));

        choix = readlineSync.question(""); //Recuperer la valeur de l'utiliateur

        if(choix==1)
        {
            console.log(chalk.red("\nListe des sociétés : \n"));
            Societes();
        }
        if(choix==2)
        {
            console.log(chalk.red("Liste des pays : \n"));
            Pays();
        }
        if(choix==3)
        {
            AjouterUtilisateur();
        }
        if(choix==4)
        {
            modifierUtilisateur();
        }
        if(choix==5)
        {
            supprimerUtilisateur();
        }
    }
    return 0;
}

module.exports = afficher();