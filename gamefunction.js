$(document).ready(function(){   

var startBtn = document.getElementById('startGame');

startBtn.onclick = function() {
  //console.log(JSON.parse(window.localStorage.getItem('deck')));
  var deckid = document.getElementById("deckname").value;
  for (var i = 1; i <= document.getElementById("playernumber").value ; i++) {
    var plName = document.getElementById("player"+i+"name").value;
    window.localStorage.setItem("player"+i+"name", plName);
    console.log("Player"+i+"name", window.localStorage.getItem("player"+i+"name"));
  }

  $.ajax({
    url: "loaddeck.php",
    type: "get",
    data: { 
      'deckid': deckid
    },
    success: function(result) {
      console.log("Success");
      window.localStorage.setItem("deck", result);
      //window.localStorage.setItem("D_Name", js["D_Name"]);
      window.open('game.html', '_blank');

    },
    error: function(error) {
       console.log('Exception: ', error);
    }
  });
}
});