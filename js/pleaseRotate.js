$(document).ready(function(){   

if (window.orientation === 90 || window.orientation === -90) {
	alert("Dette spillet må spilles i portrett, vennligst roter enheten.");
	location.reload();
}
});