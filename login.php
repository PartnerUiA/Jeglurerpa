<?php

$em = $_REQUEST['em'];
$pwd = $_REQUEST['pw'];

include_once "../private/connectdb.php";

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sth = $pdo->prepare('SELECT * FROM UserAccount WHERE U_email = :parameter');

$sth->bindParam(":parameter", $em, PDO::PARAM_STR);
$sth->execute();

if ($sth->rowCount() == 0) {
	echo 0;
} else {
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	$pw = password_verify($pwd, $result[0]['U_Password']);
	if (!$pw) {
		echo 1;
	} else {
		session_start();
        $_SESSION['uid']=$result[0]['UserAccountID'];
        echo 2;
	}
}
 } catch (Exception $e) {
 	echo 'Exception -> ', $e;

 	var_dump($e->getMessage());
 }
?>