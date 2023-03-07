const fs = require("fs");
const readlineSync = require("readline-sync"); //Pour pouvoir récuperer les input utilisateurs
const chalk = require("chalk"); //Pour mettre de la couleur dans le terminal


function Pays()
{
    var liste = new Map;
    let users = fs.readFileSync("users.json"); //Importer le fichier
    const tableau = JSON.parse(users);  //Recupérer le tableau du fichier

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
    let users = fs.readFileSync("users.json"); //Importer le fichier
    const tableau = JSON.parse(users);  //Recupérer le tableau du fichier

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
    let users = fs.readFileSync("users.json"); //Importer le fichier
    const tableau = JSON.parse(users);  //Recupérer le tableau du fichier
    var taille=tableau.length;
    id=tableau[taille-1].id +1;
    return id;
}


function AjouterUtilisateur()
{
    let users = fs.readFileSync("users.json"); //Importer le fichier
    const tableau = JSON.parse(users);  //Recupérer le tableau du fichier
    
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

    tableau.push(user);

    var newdata = JSON.stringify(tableau);
    fs.writeFile("users.json", newdata, err => {
        if(err) throw err;
        
        console.log(chalk.yellow("Utilisateur ajouté"));
    });
    return 0;
}

function afficher()
{
    let choix = 0;
    while(choix!=4)
    {
        console.log(chalk.blue("Quel est votre choix : \n\
        1 : Liste des sociétés \n\
        2 : Liste des Pays \n\
        3 : Ajouter Utilisateur"));
        console.log(chalk.green("        4 : Quitter \n "));

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
    }
    return 0;
}

afficher();