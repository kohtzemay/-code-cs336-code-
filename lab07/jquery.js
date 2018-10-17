$(document).ready(function() {
  $(".ui-button").click(function(event) {
    $.ajax({
      url: "/hello",
      data: { name: "lab7" },
      type: "POST",
      dataType: "json",
    })
    .done(function(response) {
      $("<em>", {html: response.html + response.name + "!"}).appendTo("body");
    })
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
  })
  });
});
