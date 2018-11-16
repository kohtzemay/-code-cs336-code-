$(document).ready(function() {
  $('#add-person').submit(function(event) {
      event.preventDefault();
      var form = $('#add-person');
      $.ajax({
        type: 'POST',
        url: '/people',
        data: form.serialize(),
        dataType: 'json',
        success: function(res) {
          $("<em>", { html: res.msg }).appendTo("body");
        }
      })
      .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
  });

  $('#get-person').submit(function(event) {
    event.preventDefault();
    var form = $('#get-person');
    $.ajax({
      type: 'GET',
      url: '/person/' + $('#loginID').val(),
      data: form.serialize(),
      dataType: 'json',
      success: function(res) {
        $("<div>", { html: "First name: " + res.msg.firstName + "<br \> Last name: " + res.msg.lastName + "<br \> Login ID: " + res.msg.loginID + "<br \> Start date: " + res.msg.startDate }, "</div>").appendTo("body");
      }
    })
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, we couldn't find that person." );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
  });
})
