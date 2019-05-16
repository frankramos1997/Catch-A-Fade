var express = require("express");
var router = express.Router();
var barber = require("../models/barber.js");

//routes 
router.get("/barber_list", (req, res) => {
    barber.selectAll((data) =>{
        var hbsObject  = {
            barber:data
        };
        

        res.render("barbers", hbsObject);
    });
});

// router.post("/api/barber", (req, res) => {
//     console.log(req.body);
   
//     burger.insertOne([
//         "burger", "devoured"
//     ], [req.body.barber_name, req.body.devoured], (data) =>{
//         //send back the id of the newly created burger.
//         res.json ({id: data.insertId });
//     });
// });

// router.put("/api/b/:id",(req, res) =>{
//     var condition = "id =" + req.params.id;

//     burger.updateOne({devoured: req.body.devoured}, condition, (data) => {
        
//         if (data.changedRows == 0) {
//             //if no rows were changed, then the ID must not exit.
//             return res.status(404).end();

//         }else{
//             res.status(200).end();
//         }
//     });
// });


module.exports = router;