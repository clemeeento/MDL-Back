const dataL = require("../Data/DataLater");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 100;

const business = {
    
    getAllCustomers : function () {
        return dataL.getAllUsers();
    },

    getCustomers : function(number, page) {
      
        if(number === undefined || page === undefined){
            number = defaultNumber;
            page = defaultPage;
        }
        
        if(number > maxNumber){
            number = maxNumber;
        }

        const resCustomers = dataL.getUsers(number, page);

        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total / number);

      
        return resCustomers;
    },

    delCustomer : function(id){
        return dataL.delCustomer(id);
    },

    modifCustomer : function(customer){
        return dataL.modifCustomer(customer);
    },

    addCustomers : function(customer){
        return dataL.addCustomers(customer);
    },
};

module.exports = business;