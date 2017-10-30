$(document).ready(function() {
  console.log("Let's get coding!");
  getGeoQ();
  //For loop generates the boxes for the draftPage
  for (i = 0; i <= 19; i++) {
    $('.draftboard').append('<div class="players" id="div' + i + '"/>');
    //  $(".players").each(function(){ arr.push($(this));});
  }
});
//AJAX grabbing the data from server.js
function getGeoQ() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/sportsapi',
    datatype: 'json',
    success: onSuccess,
    error: onError
  });
}

function onSuccess(json) {
  // FIXME: use a forEach loop to iterate through the json instead of a for loop.
  //Appends the boxes with JSON data and creates player profile.
  for (var i = 0; i <= 19; i++) {
    // FIXME: Create a function called render which takes one single piece of player information and creates an html 'card' like you did below.
    // FIXME: Use string literals instead of jQuery to append each line.
    var number =
      json[i].average.field_goals_made / json[i].average.field_goals_att * 100;

    $('#div' + i).append('<h6><b>' + json[i].player.full_name + '</b></h6>');
    $('#div' + i).append('<p> Points: ' + json[i].average.points + '</p>');
    $('#div' + i).append('<p> Assists: ' + json[i].average.assists + '</p>');
    $('#div' + i).append('<p> FG %: ' + Math.round(number) + '</p>');
    $('#div' + i).append('<p> Steals: ' + json[i].average.steals + '</p>');
    $('#div' + i).append('<p> Rebounds: ' + json[i].average.rebounds + '</p>');
  }
  var team1 = [];
  //Click function
  // FIXME: There is too much repetition. Use a function to handle and execute the click for each div.
  $('#div0').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[0].player.full_name + '</b></li>');
  });

  $('#div1').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[1].player.full_name + '</b></li>');
  });

  $('#div2').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[2].player.full_name + '</b></li>');
  });

  $('#div3').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[3].player.full_name + '</b></li>');
  });

  $('#div4').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[4].player.full_name + '</b></li>');
  });

  $('#div5').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[5].player.full_name + '</b></li>');
  });

  $('#div6').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[6].player.full_name + '</b></li>');
  });

  $('#div7').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[7].player.full_name + '</b></li>');
  });

  $('#div8').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[8].player.full_name + '</b></li>');
  });

  $('#div9').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[9].player.full_name + '</b></li>');
  });

  $('#div10').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[10].player.full_name + '</b></li>');
  });

  $('#div11').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[11].player.full_name + '</b></li>');
  });

  $('#div12').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[12].player.full_name + '</b></li>');
  });

  $('#div13').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[13].player.full_name + '</b></li>');
  });

  $('#div14').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[14].player.full_name + '</b></li>');
  });

  $('#div15').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[15].player.full_name + '</b></li>');
  });

  $('#div16').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[16].player.full_name + '</b></li>');
  });

  $('#div17').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[17].player.full_name + '</b></li>');
  });

  $('#div18').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[18].player.full_name + '</b></li>');
  });

  $('#div19').click(function(e) {
    e.preventDefault();
    $('.list').append('<li><b>' + json[19].player.full_name + '</b></li>');
  });
  //Push to array
  // FIXME: again, way too much repetition. Also, can team1.push($(this)) be added to the above event listener code?
  $('#div0').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div1').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div2').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div3').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div4').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div5').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div6').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div7').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div8').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div9').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div10').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div11').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div12').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div13').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div14').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div15').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div16').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div17').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  $('#div18').click(function(e) {
    team1.push($(this));
  });

  $('#div19').click(function(e) {
    e.preventDefault();
    team1.push($(this));
  });

  console.log(team1);
}

function onError(xhr, status, errorThrown) {
  alert('Sorry, there was a problem!');
  console.log('Error: ' + errorThrown);
  console.log('Status: ' + status);
  console.dir(xhr);
}
