<html>
<body>
<?php
if (isset ($_REQUEST['deckname'])) {

echo "FEAF";

}
for ($i = 0; $i < sizeof($_REQUEST['CID']); $i++) {
echo $_REQUEST['CID'][$i]."<br>";
}
?>
</body>
</html>