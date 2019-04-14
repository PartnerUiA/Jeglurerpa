<html>
<body>


<?php

$config = parse_ini_file('../private/config.ini', true);
$host = $config['database']['srvnm'];
$dbn = $config['database']['dbname'];
$un = $config['database']['usrn'];
$pd = $config['database']['pwrd'];

$em = "admin@jeglurerpa.no";
$pw = password_hash('admin', PASSWORD_BCRYPT);
$fn = "Administrator";
$ln = "Administrator";

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
//$sth = $pdo->prepare("SELECT * FROM UserAccount WHERE U_email = ?");
//$sth->execute([$em]);
//if ($sth->rowCount() != 0) {
	//echo "Denne e-posten er allerede registrert.";
//} else {
	
	$sth = $pdo->prepare('INSERT INTO UserAccount VALUES (1, ?,?,?,?, "admin")');
	$sth->execute([$pw, $em, $fn, $ln]);

//}
 } catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }
?>

</body>
</html>