const fs = require("fs");
let users = fs.readFileSync("users.json"); //Importer le fichier
const tableau = JSON.parse(users);  //Recupérer le tableau du fichier
const readlineSync = require("readline-sync");
const chalk = require("chalk");



function Pays()
{
    var liste = new Map;

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


function main()
{
    let choix = 0;
    while(choix!=3)
    {
        console.log(chalk.blue("Quel est votre choix : \n\
        1 : Liste des sociétées \n\
        2 : Liste des Pays \n\
        3 : Quitter \n "));

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
    }
    return 0;
}

main();