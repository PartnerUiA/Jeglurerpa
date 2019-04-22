<?php 

include_once "../private/connectdb.php";
$redC = array();
$bluC = array();
$ylwC = array();
$greC = array();
$did = $_REQUEST['deckid'];
//echo $did;

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sth = $pdo->prepare('SELECT Card.C_text, Card.C_Category FROM Card INNER JOIN Cards_in_Deck on Cards_in_Deck.CardID = Card.CardID WHERE Cards_in_Deck.DeckID = ?');
	//$sth->bindParam(":deckid", $did, PDO::PARAM_INT);
$sth->execute([$did]);
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < sizeof($result); $i++) {
	//print_r($result[rand(0,398)]["C_text"]."<br>");
	//print_r($result[$i]["C_text"]." - ".$result[$i]["C_Category"]."<br>");
	//print_r($result[$i]["C_Category"]);
	switch ($result[$i]["C_Category"]) {
		case "Red":
		//print_r("Red: ".$result[$i]["C_text"]."<br>");
		array_push($redC, $result[$i]["C_text"]);
		break;
		case "Blu":
		//print_r("Blu: ".$result[$i]["C_text"]."<br>");
		array_push($bluC, $result[$i]["C_text"]);
		break;
		case "Yel":
		//print_r("Yel: ".$result[$i]["C_text"]."<br>");
		array_push($ylwC, $result[$i]["C_text"]);
		break;
		case "Gre":
		//print_r("Gre: ".$result[$i]["C_text"]."<br>");
		array_push($greC, $result[$i]["C_text"]);
		break;
		default:
		break;
	}
}

$sth = $pdo->prepare('SELECT D_Name FROM Deck WHERE DeckID = ?');
$sth->execute([$did]);
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

$deck = array(
	"Red" => $redC,
	"Blu" => $bluC,
	"Yel" => $ylwC,
	"Gre" => $greC,
	"D_Name" => $result[0]["D_Name"]);

echo json_encode($deck);

} catch (Exception $e) {
 	echo 'Exception -> ';
 	echo $e;
}


?>