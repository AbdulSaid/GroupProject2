$(document).ready(function() {
  //on initial load of the webpage, the signOut button will be hidden
  //$('#logOut').css('display', 'none');
  //setting an empty variable equal to null
  console.log('js file is working');
  var windowOpen;
  //on click of the login button, a new window(popup) will open to the specified href, with a width and height pre-defined
  $('.googleAuth').on('click', function() {
    event.preventDefault();
    //this url was generated from the calenderRoutes.js file url variable
    var googleUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&prompt=consent&response_type=code&client_id=32898389523-n1q62hpuivjjee3i86n876pf96vkn543.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauthcallback';
    windowOpen = window.open(
      googleUrl,
      'Sign in with Google',
      'Width=500px, height: 700px'
    );
  });
  //this function works with the file under public/oauthcallback/callback.html
  //when this window (calender-login page) gets a message it executes
  window.onmessage = function(event) {
    //when a successful oauth code is given back from the google login window
    //this sign in button will be hidden
    $('.googleAuth').css('display', 'none');
    //the sign out button will then be displayed
    //$('#logOut').css('display', 'block');
    //the window created before with the link to the login closes
    windowOpen.close();
    //saving the message received from that closed window into a variable.
    //However the message received is the entire location.href of that window and we only want the oauth code
    var url = event.data;
    //console.log(event);
    //console.log('This is the event :' + url);
    //lastIndexOf of will cut everything before the specified string
    var index = url.lastIndexOf('code=');
    //this will take 5 indexs ahead of the variable index, so we also cut out the
    //consistent portion of "code=" for every users login oauth code.
    var urlIndex = url.substring(index + 5);
    // console.log('with index ' + urlIndex);
    //var code = urlIndex.substring(0, urlIndex.lastIndexOf('&'));
    //although uneccessary, I just set urlIndex=code, and sent the code to calendarRoutes.js
    var code = urlIndex;
    console.log('This is the final code: ' + code);
    //sending the modified code using a post request to the url /token. the data has to be in an object, so
    //just wrap the code in an object and the property code set equal to the variable code.
    $.ajax({
      type: 'POST',
      url: '/token',
      data: { code: code }
    });
  }; //
  /*$('#submitProfile').on('click', function() {
    event.preventDefault();
    console.log('profile');
    var userNameProfile = $('#userName')
      .val()
      .trim();
    var userAddressProfile = $('#userAddress')
      .val()
      .trim();
    var userPhoneProfile = $('#userPhone')
      .val()
      .trim();
    var userEmailProfile = $('#userEmail')
      .val()
      .trim();

    $.ajax({
      type: 'POST',
      url: '/profile/update',
      data: {
        userName: userNameProfile,
        userAddress: userAddressProfile,
        userPhone: userPhoneProfile,
        userEmail: userEmailProfile
      }
    });
  });*/
  //
  $('.signUpUser').on('click', function() {
    event.preventDefault();
    console.log('yes user');
    var name = $('#name')
      .val()
      .trim();
    var userName = $('#userName')
      .val()
      .trim();
    var userAddress = $('#userAddress')
      .val()
      .trim();
    var userPhone = $('#userPhone')
      .val()
      .trim();
    var userEmail = $('#userEmail')
      .val()
      .trim();
    var userPassword = $('#userPassword')
      .val()
      .trim();

    $.ajax({
      type: 'POST',
      url: '/signup/',
      data: {
        userName: userName,
        name: name,
        userAddress: userAddress,
        userPhone: userPhone,
        userEmail: userEmail,
        userPassword: userPassword
      }
    });
  });
  $('.signUpContractor').on('click', function() {
    event.preventDefault();
    console.log('yes contractor');
  });
});
