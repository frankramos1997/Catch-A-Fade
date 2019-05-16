var orm = require ("../config/orm.js");

//Calls ORM function specific to appointments
var appointment = {
    selectAll: (cb) =>{
        orm.selectAll("appointments", (res) =>{
            cb(res);

        });
    
},

selectFromId:(id,cb) =>{
    orm.selectFromId("appointments", id, (res) =>{
        cb(res);
    });
},




insertOne: (cols, vals, cb) =>{
    orm.insertOne("appointments", cols, vals, (res) => {
        cb(res);
    });
},

updateOne: (objColVals, condition, cb) =>{
    orm.updateOne("appointments", objColVals, condition, (res) => {
        cb(res);
    });
    }
};
module.exports = appointment;
