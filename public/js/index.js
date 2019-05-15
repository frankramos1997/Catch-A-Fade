// Get references to page elements
var $barberText = $("#barber-text");
var $barberDescription = $("#barber-description");
var $submitBtn = $("#submit");
var $barberList = $("#barber-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBarber: function(barber) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/barber",
      data: JSON.stringify(barber)
    });
  },
  getBarber: function() {
    return $.ajax({
      url: "api/barber",
      type: "GET"
    });
  },
  deleteBarber: function(id) {
    return $.ajax({
      url: "api/barber/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshBarber = function() {
  API.getBarber().then(function(data) {
    var $barber = data.map(function(barber) {
      var $a = $("<a>")
        .text(barber.text)
        .attr("href", "/barber/" + barber.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": barber.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $barberList.empty();
    $barberList.append($barber);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var barber = {
    text: $barberText.val().trim(),
    description: $barberDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(barber).then(function() {
    refreshBarber();
  });

  $barberText.val("");
  $barberDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBarber(idToDelete).then(function() {
    refreshBarber();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$barberList.on("click", ".delete", handleDeleteBtnClick);
