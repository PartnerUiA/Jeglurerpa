$(document).ready(function(){   

var ck = getCookie('login');

	if (ck = 1) {
		document.getElementById('logininfo').innerHTML = "Min side";
		document.getElementById('logininfo').href = "minside.php";
	}

});