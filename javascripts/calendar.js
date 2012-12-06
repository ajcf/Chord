//these methods handle the next and previous buttons.
$("#prevbutton").live("click", function(){
  var obj = $(this);
  console.log(obj.data("month"));
  if (obj.data("month") == "december"){
    obj.data("month", "november");
    $("#nextbutton").data("month", "november");
    $("#monthname").text("November");
    $("#december").css("display", "none");
    $("#november").css("display", "block");
  } else if (obj.data("month") == "january"){
    obj.data("month", "december");
    $("#nextbutton").data("month", "december");
    $("#monthname").text("December");
    $("#january").css("display", "none");
    $("#december").css("display", "block");
  } else{
    alert("Older Months cannot be edited.");
  }
});
$("#nextbutton").live("click", function(){
  var obj = $(this);
  console.log(obj.data("month"));
  if (obj.data("month") == "november"){
    obj.data("month", "december");
    $("#prevbutton").data("month", "december");
    $("#monthname").text("December");
    $("#november").css("display", "none");
    $("#december").css("display", "block");
  } else if (obj.data("month") == "december"){
    obj.data("month", "january");
    $("#prevbutton").data("month", "january");
    $("#monthname").text("January");
    $("#december").css("display", "none");
    $("#january").css("display", "block");
  } else{
    alert("Schedule has not been possible for future months.");
  }
});
//These bits handle the modal boxes (see zurb's reveal)
$(".event, .swapevent").live("click", function(){
  $("#detail-date").text($("#monthname").text().trim() + " " + $(this).parents('td').text().trim().split(' ')[0].trim() +", 2012");
  var time = $(this).text().split(': ')[0].trim();
  $("#detail-time").text(time.split(' ')[0] + ":00 " + time.split(' ')[1]);
  $("#detail-room").text($(this).text().split(': ')[1] + " (Standard Room)");
  $("#modal").data('eventid', $(this).attr('id'));
  $("#modal").reveal();
});
$("#exitbutton").live("click", function(){
  $("#modal").trigger('reveal:close');
});
$("#deletebutton").live("click", function(){
  $("#"+$("#modal").data('eventid')).css('display', 'none');
  $("#modal").trigger('reveal:close');
});
