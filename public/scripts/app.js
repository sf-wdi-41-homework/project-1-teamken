$(document).ready(function() {

  $('.login-form').on('submit', function() {
    method:'POST',
    url: 'api/login',
    success:onSuccess,
    error:onError
  });

});

function onSuccess() {
  
}


function onError() {
  console.log('error!');
}
