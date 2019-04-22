<html>
<body>
<?php
session_start();
if (isset ($_REQUEST['deckname'])) {

}
for ($i = 0; $i < sizeof($_REQUEST['CID']); $i++) {
echo $_REQUEST['CID'][$i]."<br>";
}
?>
</body>
</html>