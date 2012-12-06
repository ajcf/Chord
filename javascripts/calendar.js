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
    console.log(obj.data('month'));
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
    console.log(obj.data('month'));
  }
});
