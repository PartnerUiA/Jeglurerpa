<?php

$em = $_COOKIE['em'];
$pwd = $_COOKIE['pd'];

unset($_COOKIE['em']);
unset($_COOKIE['pd']);

echo '<script>document.cookie = "em= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
echo '<script>document.cookie = "pd= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
include_once "../private/connectdb.php";

try {
$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sth = $pdo->prepare('SELECT * FROM UserAccount WHERE U_email = :parameter');

$sth->bindParam(":parameter", $em, PDO::PARAM_STR);
$sth->execute();

if ($sth->rowCount() == 0) {
	echo "Feil brukernavn.";
	echo '<script>alert("Brukeren eksisterer ikke.");</script>';
	echo "<script>location.replace('register.html');</script>";
} else {
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	$pw = password_verify($pwd, $result[0]['U_Password']);

	if (!$pw) {
		echo "Feil passord";
		echo '<script>alert("Feil passord.");</script>';
		echo "<script>location.replace('register.html');</script>";
	} else {
		setcookie("uid", $result[0]['UserAccountID'], time()+(3600 * 168));
		setcookie('login', 1, time()+(3600*168));
		echo "<script>location.replace('index.html');</script>";
	}
}
 } catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }

/*
if ($pw) {
	"<script>location.replace('index.html')</script>";
} else {
	"<script>location.replace('register.html')</script>";
}
*/
?>