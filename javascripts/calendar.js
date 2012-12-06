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
  cancelswap();
});
$("#deletebutton").live("click", function(){
  $("#"+$("#modal").data('eventid')).css('display', 'none');
  cancelswap();
  $("#modal").trigger('reveal:close');

});
$("#swapbutton").live("click", function(){
  $("#detail-swap").css("display", "block");
});
$("#confirmswap").live("click", function(){
  var event = $("#" + $("#modal").data('eventid')).addClass('eventinswap');
  cancelswap();
  $("#modal").trigger('reveal:close');
});
$("#cancelswap").live("click", function(){
  cancelswap();
});
var cancelswap = function(){
  $("#detail-swap").css("display", "none");
  $("#swapnote").attr('value','');
}

//stuff for modals for search dates
$(".datelink").live("click", function(){
  $("#datemodal").reveal();
});
$("#filterdate").live("click", function(){
  var date1 = ( ($("#startdate").val() === "") ? ["00", "00", "00"] : $("#startdate").val().split('-') );
  console.log(date1);
  $("#searchtable").data("startdate", date1[1]+"/"+date1[2]);
  var date2 = ( ($("#enddate").val() === "") ? ["15", "12", "31"] : $("#enddate").val().split('-') );
  console.log(date2);
  $("#searchtable").data("enddate", date2[1]+"/"+date2[2]);
  refilter();
  $("#datemodal").trigger("reveal:close");
});
$("cleardatefilter").live("click", function(){
  //reshows hidden reservations
  $("#searchtable").data("startdate", "10/31");
  $("#searchtable").data("enddate", "12/31");
  $("#datemodal").trigger("reveal:close");
});

$(".timelink").live("click", function(){
  $("#timemodal").reveal();
});
$("#cleartimefilter").live("click", function(){
  //reshow hidden reservations
  $("#starttime").val('');
  $("#endtime").val('');
  $("#timemodal").trigger("reveal:close");
});
$("#filtertime").live("click", function(){
  $("#datemodal").trigger("reveal:close");
});


$(".durationlink").live("click", function(){
  $("#durationmodal").reveal();
});
$("#filterduration").live("click", function(){
  $("#durationmodal").trigger('reveal:close');
});

$(".roomtypelink").live("click", function(){
  $("#roomtypemodal").reveal();
});
$(".availabilitylink").live("click", function(){
  $("#availabilitymodal").reveal();
});
$(".takelink").live("click", function(){
  $("#takemodal").reveal();
});

function refilter(){
  var rows = $("#searchtable tr");
  var cur;
  var date;
  var time;
  var duration;
  var roomtype;
  var availability;
  var show;
  var cells;
  for(var i = 1; i < rows.length; i++){
    show = true;
    cur=rows[i];
    cells = cur.cells;
    for(var j = 0; j < cells.length; j++){
      if(cells[j].className === "datetd") date = cells[j].textContent.trim();
      if(cells[j].className === "timetd"){
        atime = cells[j].textContent.trim().split(' ');
        time = parseInt(atime[0], 10) + (atime[1] == "AM" ? 0 : 12);
      }
      if(cells[j].className === "durationtd") duration = cells[j].textContent.trim();
      if(cells[j].className === "roomtypetd") roomtype = cells[j].textContent.trim();
      if(cells[j].className === "availabilitytd") availability = cells[j].textContent.trim();
    }
    console.log(date+" "+time+" "+duration+" "+roomtype+" "+availability);
    if(date < $("#searchtable").data("startdate") || date > $("#searchtable").data("enddate")) show=false;
    if(time < $("#searchtable").data("starttime") || time > $("#searchtable").data("endtime")) show =false;
    if($("#searchtable").data("duration").length > 0 && duration !== $("#searchtable").data("duration")) show = false;
    if($("#searchtable").data("roomtype").length > 0 && duration !== $("#searchtable").data("roomtype")) show = false;
    if($("#searchtable").data("availability").length > 0 && duration !== $("#searchtable").data("availability")) show = false;
    if(show){
      cur.style.display="";
    } else {
      cur.style.display="none";
    }
  }
  console.log($("#searchtable").data("startdate")+" "+$("#searchtable").data("enddate"));
  console.log($("#searchtable").data("starttime")+" "+$("#searchtable").data("endtime"));
  console.log($("#searchtable").data("duration"));
  console.log($("#searchtable").data("roomtype"));
  console.log($("#searchtable").data("availability"));
  console.log("filtered.");
}
