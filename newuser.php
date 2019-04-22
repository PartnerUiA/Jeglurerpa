<?php
function tokenG($length = 65) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$fn = $_REQUEST['fn'];
$ln = $_REQUEST['ln'];
$em = $_REQUEST['em'];
$pwd = password_hash($_REQUEST['pw'], PASSWORD_BCRYPT);

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
		$regist = $pdo->prepare('INSERT INTO UserAccount (U_Password, U_email, U_Name, U_Surname, U_AccountType) VALUES (:pass,:email,:fname,:lname,"standard")');
		$regist->execute([
			':pass' => $pwd,
			':email' => $em,
			':fname' => $fn,
			':lname' => $ln
		]);
		$tokenGen = $pdo->prepare('INSERT INTO password_resets (email, token) VALUES (:email,:token)');
		$tokenGen->execute([
			':email' => $em,
			':token' => tokenG()
		]);
		echo '<script>alert("'.$em.' er nå registrert. Du kan logge inn.");</script>';
		echo "<script>location.replace('index.html');</script>";
	}
} catch (Exception $e) {
 	echo 'Exception -> ';
 	var_dump($e->getMessage());
 }
?>