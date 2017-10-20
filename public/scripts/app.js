$(document).ready(function() {
 console.log("Let's get coding!");
 getGeoQ();
 var arr=[];

   for(i = 0; i <= 19; i++) {
    $('.draftboard').append('<div class="players" id="div'+ i +'"/>');
  //  $(".players").each(function(){ arr.push($(this));});
  }
console.log(arr[0]);
});

function getGeoQ() {
 $.ajax({
   method:'GET',
   url: 'http://localhost:3000/sportsapi',
   datatype:'json',
   success: onSuccess,
   error: onError
 })
}



function onSuccess(json) {



for (var i = 0; i <=19; i++) {

 	var number = json[i].average.field_goals_made / json[i].average.field_goals_att *100;

    $('#div'+i).append("<h6><b>" + json[i].player.full_name + "</b></h6>");
    $('#div'+i).append("<p> Points: " + json[i].average.points + "</p>");
    $('#div'+i).append("<p> Assists: " + json[i].average.assists + "</p>");
    $('#div'+i).append("<p> FG %: " + Math.round(number) + "</p>");
    $('#div'+i).append("<p> Steals: " + json[i].average.steals + "</p>");
    $('#div'+i).append("<p> Rebounds: " + json[i].average.rebounds + "</p>");
}

}

function onError(xhr, status, errorThrown) {
 alert("Sorry, there was a problem!");
 console.log("Error: " + errorThrown);
 console.log("Status: " + status);
 console.dir(xhr);
}