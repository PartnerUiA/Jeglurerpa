<?php
$config = parse_ini_file('../private/config.ini', true);
$host = $config['database']['srvnm'];
$dbn = $config['database']['dbname'];
$un = $config['database']['usrn'];
$pd = $config['database']['pwrd'];

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sth = $pdo->prepare("SELECT * FROM Card");
$sth->execute();
 } catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }
$result = $sth->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < 20; $i++) {
	print_r($result[rand(0,398)]["C_text"]."<br>");

}

while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
	$cid = $row['C_ID'];
	$txt = $row['C_text'];
	$cat = $row['C_Category'];
	$deck = array(array($cid, $txt, $cat));
}

?>