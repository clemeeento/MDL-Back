const express = require("express");
const business = require("../Business/business");
const cors =require("cors");
const bodyParser = require("body-parser");
const app = express();

const apiServ = {

    start : function(port) {

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors());

        app.use(function(req,res,next){
            res.header("Access-Control-Allow-Origin","*");
            next();
        });

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

        app.put("/api/customers", function(req, res){
            const updatedCustomer = req.body; 
            business.modifCustomer(updatedCustomer);
            res.send("Modification du client réussie");
        });

        app.post("/api/customers", function(req, res) {
            const total = business.getCustomers();
            let id = total.total + 1;

            const newCustomer ={
                id : id,
                email : req.body.email,
                first : req.body.first,
                last : req.body.last,
                company : req.body.company,
                created_at : req.body.created_at,
                country : req.body.country
            };

            res = business.addCustomers(newCustomer);
        });


        app.listen(port, function(){ console.log("Serveur lancé sur le port " +port);});
    }
};


module.exports = apiServ;