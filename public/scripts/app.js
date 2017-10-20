

var player = "http://api.sportradar.us/nba/trial/v4/en/players/ab532a66-9314-4d57-ade7-bb54a70c65ad/profile.json?api_key=qycdwjh8vnrxckj26z5yc7pn";

$(document).ready(function() {
 console.log("Let's get coding!");
 // getGeoQ();
});

function getGeoQ() {
 $.ajax({
   method:'GET',
   url: player,
   datatype:'json',
   success: onSuccess,
   error: onError
 })
}
function onSuccess(json) {
  console.log("WE ARE HAPPY: ", json)
  console.log(json.categories.ranks.players.full_name);

 }



function onError(xhr, status, errorThrown) {
 console.log("Error: " + errorThrown);
 console.log("Status: " + status);
 console.dir(xhr);
}
