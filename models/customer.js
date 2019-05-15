var orm = require ("../config/orm.js");

//Calls ORM function specific to barber
var customer_log = {
    selectAll: (cb) =>{
        orm.selectAll("customer_log", (res) =>{
            cb(res);

        });
},

selectFromId:(id,cb) =>{
    orm.selectFromId("customer_log", id, (res) =>{
        cb(res);
    });
},




insertOne: (cols, vals, cb) =>{
    orm.insertOne("customer_log", cols, vals, (res) => {
        cb(res);
    });
},

updateOne: (objColVals, condition, cb) =>{
    orm.updateOne("customer_log", objColVals, condition, (res) => {
        cb(res);
    });
    }
};
module.exports = customer_log;
