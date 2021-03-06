function getCookie(cname) {
	var name = cname + "=";
  	var decodedCookie = decodeURIComponent(document.cookie);
  	var ca = decodedCookie.split(';');
  	for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
    	while (c.charAt(0) == ' ') {
      		c = c.substring(1);
    	}
    	if (c.indexOf(name) == 0) {
      		return c.substring(name.length, c.length);
    	}
	}
}

function setCookie(cname, value) {
  var d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  var exp = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + value + ";" + exp + ";path=/";
}


function listCookies() {
  var cookies = document.cookie.split(';');
  var aStr = '';
  for (var i = 1; i <= cookies.length; i++) {
    aStr += i + ' ' + cookies[i-1] + "\n";
  }   
}