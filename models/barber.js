var orm = require ("../config/orm.js");

//Calls ORM function specific to barber
var barber = {
    selectAll: (cb) =>{
        orm.selectAll("barber_log", (res) =>{
            cb(res);
            
        });
        
    
},

selectFromId:(id,cb) =>{
    orm.selectFromId("barber_log", id, (res) =>{
        cb(res);
    });
},




insertOne: (cols, vals, cb) =>{
    orm.insertOne("barber_log", cols, vals, (res) => {
        cb(res);
    });
},

updateOne: (objColVals, condition, cb) =>{
    orm.updateOne("barber_log", objColVals, condition, (res) => {
        cb(res);
    });
    }
};
module.exports = barber;
