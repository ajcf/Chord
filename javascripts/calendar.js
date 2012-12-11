//these methods switch between calendar and search views
$("#gotocalendar").live("click", function(){
  console.log("hello");
  $("#searchview").css("display", "none");
  $("#calendarview").css("display", "");
});
$("#gotosearch").live("click", function(){
  $("#calendarview").css("display", "none");
  $("#searchview").css("display", "");
});
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
  //$("#cancelsuccess").show(15);
  alert("Reservation has been deleted.");
});
$("#swapbutton").live("click", function(){
  $("#detail-swap").css("display", "block");
});
$("#confirmswap").live("click", function(){
  var event = $("#" + $("#modal").data('eventid')).addClass('eventinswap');
  cancelswap();
  $("#modal").trigger('reveal:close');
  //$("#swapsuccess").show(15);
  alert("Reservation has been placed in swap!");
});
$("#cancelswap").live("click", function(){
  cancelswap();
});
var cancelswap = function(){
  $("#detail-swap").css("display", "none");
  $("#swapnote").attr('value','');
}
$("#filterbutton").live("click", function(){
  var date1 = ( ($("#startdate").val() === "") ? ["00", "00", "00"] : $("#startdate").val().split('-') );
  $("#searchtable").data("startdate", date1[1]+"/"+date1[2]);
  var date2 = ( ($("#enddate").val() === "") ? ["15", "12", "31"] : $("#enddate").val().split('-') );
  $("#searchtable").data("enddate", date2[1]+"/"+date2[2]);
  $("#searchtable").data("starttime", $("#starttime").val());
  $("#searchtable").data("endtime", $("#endtime").val());
  $("#searchtable").data("roomtype", $("#roomtype").val());
  $("#searchtable").data("duration", $("#duration").val());
  $("#searchtable").data("availability", $("#availability").val());
  refilter();
});
$("#unfilterbutton").live("click", function(){
  $("#searchtable").data("startdate", "10/01");
  $("#searchtable").data("enddate", "12/31");
  $("#startdate").val("");
  $("#enddate").val("");
  $("#searchtable").data("starttime", "1");
  $("#searchtable").data("endtime", "24");
  $("#starttime").val('0');
  $("#endtime").val('25');
  $("#searchtable").data("roomtype", "");
  $("#roomtype").val("");
  $("#searchtable").data("duration", "");
  $("#duration").val("");
  $("#searchtable").data("availability", "");
  $("#availability").val("");
  refilter();
});

$(".takelink").live("click", function(caller){
  var row = caller.currentTarget.parentNode.parentNode.id;
  $("#detail-date2").text($("#dateb"+"-"+row).text());
  $("#detail-time2").text($("#timeb"+"-"+row).text());
  $("#detail-duration2").text($("#durationb"+"-"+row).text());
  $("#detail-type2").text($("#typeb"+"-"+row).text());
  $("#takemodal").data("rowid", row);
  $("#takemodal").reveal();
});

$(".swaplink").live("click", function(caller){

  var row = caller.currentTarget.parentNode.parentNode.id;
  $("#swapmodal").data("rowid", row);
  $("#swapmodal").reveal();
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
    //console.log(date+" "+time+" "+duration+" "+roomtype+" "+availability);
    if(date < $("#searchtable").data("startdate") || date > $("#searchtable").data("enddate")){ 
      console.log(date + " is not within date range.");
      show=false;
    }
    if(time < $("#searchtable").data("starttime") || time > $("#searchtable").data("endtime")){ 
      console.log(time +" is not within time range");
      show =false;
    }
    if($("#searchtable").data("duration").length > 0 && duration !== $("#searchtable").data("duration")){
      console.log(duration + " is not equal to duration.");
     show = false;
   }
    if($("#searchtable").data("roomtype").length > 0 && roomtype !== $("#searchtable").data("roomtype")){ 
      console.log(roomtype + " is not equal to roomtype");
      show = false;}
    if($("#searchtable").data("availability").length > 0 && duration !== $("#searchtable").data("availability")){
      console.log(availability + " is not equal to availability");
     show = false;
   }
    if(show){
      cur.style.display="";
    } else {
      cur.style.display="none";
    }
  }
  console.log("filtered.");
}

$("#swapaccept").live("click", function(){
  $("#"+$("#swapmodal").data("rowid")).detach();
  var id = $("#swapreservations").val();
  $("#"+id).remove();
  //need to add then new one to the calendar
  $("#swapmodal").trigger("reveal:close");
  alert("Practice Room has been successfully reserved.");
});
$("#swapcancel").live("click", function(){
  $("#swapmodal").trigger("reveal:close");
});

$("#takeaccept").live("click", function(){
  $("#"+$("#takemodal").data("rowid")).detach();
  var id = $("#swapreservations").val();
  $("#"+id).remove();
  //need to add the new one to the calendar
  $("#takemodal").trigger("reveal:close");
  alert("Practice Room has been successfully reserved.");
});
$("#takecancel").live("click", function(){
  $("#takemodal").trigger("reveal:close");
});


