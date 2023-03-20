const dataL = require("../Data/DataLater");

const business = {
    
    getAllCustomers : function () {
        return dataL.getAllUsers();
    }
};

module.exports = business;