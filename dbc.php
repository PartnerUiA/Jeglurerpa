<?php


function db_connect() {

	static $connection;
	if (!isset($connection)) {
		$config = parse_ini_file('../private/config.ini');
		$connection = mysqli_connect("jeglurerpano01.mysql.domeneshop.no", "jeglurerpano01", "AphsPh2019sshf", "jeglurerpano01");
	}

	if ($connection === false) {
		return mysqli_connect_error();
	}
	return $connection;
}

$connection = db_connect();
echo $connection;
if ($connection->connect_error) {
	die("Connection failed: " . $connection->connect_error);
}
$sql = "SELECT * FROM Card";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
	while ($row = $result->fetch-assoc()) {
		echo 'C_text: ' . $row["C_text"] . "<br>";
	}
} else {
	echo "0 results";
}
$connection->close();


?>