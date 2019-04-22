<?php
session_start();



include_once "../private/connectdb.php";

$arr = array();
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$spl = str_split($actual_link);

for ($x = 0; $x < sizeof($spl) ; $x++) {
	if ($spl[$x] == "?") {
		for ($o = $x; $o < sizeof($spl); $o++) {
			//echo $spl[$o];
			array_push($arr, $spl[$o]);
			//echo ($o);
		}
		//echo $spl[$x];
	}

}
$str = '';
for ($p = 1; $p < sizeof($arr); $p++) {
	 $str .= $arr[$p];
}
try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sth = $pdo->prepare("SELECT * FROM password_resets WHERE token = :token");
$sth->execute([':token' => $str]);
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

if ($sth->rowCount() === 1) {
	$uem = $result[0]['email'];
}
 } catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }



$headers = 'From: Jeg Lurer På <noreply@jeglurerpa.no>' . "\r\n" .
'Reply-To: <noreply@jeglurerpa.no>' . "\r\n" .
'X-Mailer: PHP/' . phpversion()  . "\r\n" . 'Content-type: text/html; charset=iso-8859-1';
$bruker = "Bruker1";
$randlink = "https://www.jeglurerpå.no/passordreset.php?";

$message = "<html><body><br>";
$message .= '<center><a href="www.jeglurerpå.no"><img src="https://xn--jeglurerp-e3a.no/secret/img/logo.png"></a>';
$message .= "<br><br>";
$message .= "<p>Vi har motatt en forespørsel om nullstilling av passord på din bruker, $bruker.</p>";
$message .= "<br><br>";
$message .= "<p>For å nullstille ditt passord, følg denne linken.</p>";
$message .= "<a href="."$randlink>Link</a>";
$message .= "</body></html>";

mail('petterbraten@gmail.com', 'Nullstill ditt passord', $message, $headers);



?>
