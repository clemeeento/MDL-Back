const apiServ = require("./Presentation/apiPres");
const consPres = require("./Presentation/consPres");
const port = 3001;

function main()
{
    apiServ.start(port);
    consPres.afficher();
}

main();