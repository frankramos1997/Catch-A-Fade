var connection = require("./connection.js");

var printQuestionMarks =(num) =>{
    var arr = [];
    for(var i = 0; i< num; i++) arr.push("?");
    return arr;
}
var objToSql =(obj) =>{
    var arr =[];

    for(var key in obj) {
        var value = obj[key];

        if(Object.hasOwnProperty.call(obj, key)){
            if(typeof value === "string" && value.indexOf("") >= 0) value = "'" + value + "'";

            arr.push(key + " = " + value);
        }

    }
}

var orm = { 
    selectAll: (table,cb) =>{

        var queryStr = "SELECT * from " + table + ";";

        connection.query(queryStr, (err, result) =>{

        if(err) throw err;

        cb(result);
        

    });
    

    },

    selectFromId:( table, id, cb) =>{

        var queryStr = "SELECT * from " + table + " WHERE id = " + id +";";

        connection.query(queryStr, (err, result) =>{

            if(err) throw err;

            cb(result);
        });
        
        

    },



    insertOne: (table, cols, vals, cb) => {
        var queryStr ="INSERT INTO " + table;
        queryStr += " (" + cols.toString() + ")";
        queryStr += " VALUES (" + printQuestionMarks(vals.length) +");";

        connection.query(queryStr, vals, (err, results) => {
            if(err) throw err;

            cb(results);
        });
    },

    updateOne: (table, objColVals, condition, cb) =>{
        var queryStr = "UPDATE" + table;
        queryStr += "SET" + ObjToSql(objColVals);
        queryStr += "WHERE" + condition + ";";

        connection.query(queryStr, (err, result) =>{

        if(err) throw err;

        cb(result);
    });
}

}
module.exports = orm;
