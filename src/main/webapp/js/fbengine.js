window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: '1403131779903455', // App ID from the app dashboard
        channelUrl: 'http://localhost:8080/xeretao/channel.html', // Channel file for x-domain comms
        status: true, // Check Facebook Login status
        xfbml: true // Look for social plugins on the page
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLogin(callback) {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log("connected");
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            callback(accessToken);
            return true;
        } else if (response.status === 'not_authorized') {
            console.log("Not authorized");
            return false;
        } else {
            console.log("Tentando Login");
            FB.login(function(response) {
                if (response.authResponse) {
                    callback();
                    return true;
                } else {
                    alert("Não foi possivel efetuar o login no facebook");
                    return false;
                }
            });
        }
    });
}