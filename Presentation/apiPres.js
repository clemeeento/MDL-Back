const express = require("express");
const business = require("../Business/business");
const cors =require("cors");
const bodyParser = require("body-parser");
const app = express();

const apiServ = {

    start : function(port) {

        app.use(bodyParser.json());
        app.use(cors());

        app.use(function(req,res,next){
            res.header("Access-Control-Allow-Origin","*");
            next();
        });

        // app.get("/api/customers",function(req,res){
        //     const customers = business.getAllCustomers();
        //     res.json(customers);
        // });

        app.delete("/api/customers/:id", function(req, res) 
        {
            const customerId = req.params.id;
            business.delCustomer(customerId);
            res.send("Suppression du client réussi");
        });

        app.get("/api/customers", function(req, res){

            const number = req.query.number;
            const page = req.query.page;

            const resCustomers = business.getCustomers(number, page);

            res.json(resCustomers);
        });


        app.listen(port, function(){ console.log("Serveur lancé sur le port " +port);});
    }
};


module.exports = apiServ;