<?php

/*
echo $_COOKIE['fn'];
echo $_COOKIE['ln'];
echo $_COOKIE['em'];
echo $_COOKIE['pd'];
*/

$fn = $_COOKIE['fn'];
$ln = $_COOKIE['ln'];
$em = $_COOKIE['em'];
$pwd = password_hash($_COOKIE['pd'], PASSWORD_BCRYPT);

unset($_COOKIE['em']);
unset($_COOKIE['pd']);
unset($_COOKIE['fn']);
unset($_COOKIE['ln']);
/*
echo '<script>document.cookie = "em= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
echo '<script>document.cookie = "pd= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
echo '<script>document.cookie = "fn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
echo '<script>document.cookie = "ln= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";</script>';
*/



try {
	include_once "../private/connectdb.php";
	$pdo = new PDO("mysql:host=$host;dbname=$dbn", "$un", "$pd");

	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$sth = $pdo->prepare('SELECT * FROM UserAccount WHERE U_email = :parameter');

	$sth->bindParam(":parameter", $em, PDO::PARAM_STR);
	$sth->execute();

if ($sth->rowCount() >= 1) {
	echo "Eposten er allerede i bruk.";
	echo '<script>alert("Denne eposten er allerede i bruk.");</script>';
	echo "<script>location.replace('register.html');</script>";
	} 
	else {
		//$regist = $pdo->prepare('INSERT INTO UserAccount (U_Password, U_email, U_Name, U_Surname, U_AccountType) VALUES (:pass,:email,:fname,:lname,"standard")');
		/*$regist->execute([
			':pass' => $pwd,
			':email' => $em,
			':fname' => $fn,
			':lname' => $ln
		]);*/
		echo '<script>alert("'.$em.' er nå registrert. Du kan logge inn.");</script>';
		echo "<script>location.replace('index.html');</script>";
	}
} catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }
?>