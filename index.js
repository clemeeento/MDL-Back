const apiServ = require("./Presentation/apiPres");
const port = 3000;

function main()
{
    apiServ.start(port);
}

main();