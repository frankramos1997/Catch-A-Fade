// var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Barber.findAll({}).then(function(dbBarber) {
    //   res.render("landing", {
    //     msg: "Welcome!",
    //     examples: dbBarber
    //   });
    // });
    res.render("landing");
  });
  
  app.get("/login", function(req, res) {
    // db.Barber.findAll({}).then(function(dbBarber) {
    //   res.render("landing", {
    //     msg: "Welcome!",
    //     examples: dbBarber
    //   });
    // });
    res.render("login");
  });


  // Load barber page and pass in an example by id
  // app.get("/barber/:id", function(req, res) {
  //   db.Barber.findOne({ where: { id: req.params.id } }).then(function(dbBarber) {
  //     res.render("barber", {
  //       example: dbBarber
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
