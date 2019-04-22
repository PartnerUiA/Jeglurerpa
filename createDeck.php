<?php 

include "../private/createDeck.php";
  $result = $sth->fetchAll(PDO::FETCH_ASSOC);
echo "<form action='registerDeck.php'>";
echo "Navn på kortstokk: <input type='text' name='deckname'>";
echo "<h3>Kropp og Seksualitet:</h3>";
echo "<ul>";
for ($i = 0; $i < sizeof($result); $i++) {
  switch ($result[$i]['C_Category']) {
    case "Red":
    //echo $result[$i]['CardID']."<br>";
    echo "<li><input type='checkbox' name='CID[]' value=".$result[$i]['CardID'].">".$result[$i]['C_text']."</li>";
    break;
  } 
}
echo "</ul>";
echo "<h3>Hygiene</h3>";
echo "<ul>";
for ($i = 0; $i < sizeof($result); $i++) {
  switch ($result[$i]['C_Category']) {
    case "Blu":
    //echo $result[$i]['CardID']."<br>";
    echo "<li><input type='checkbox' name='CID[]' value=".$result[$i]['CardID'].">".$result[$i]['C_text']."</li>";
    break;
  } 
}
echo "</ul>";
echo "<h3>Sosiale Ferdigheter</h3>";
echo "<ul>";
for ($i = 0; $i < sizeof($result); $i++) {
  switch ($result[$i]['C_Category']) {
    case "Yel":
    //echo $result[$i]['CardID']."<br>";
    echo "<li><input type='checkbox' name='CID[]' value=".$result[$i]['CardID'].">".$result[$i]['C_text']."</li>";
    break;
  } 
}
echo "</ul>";
echo "<h3>Venner og Kjærester</h3>";
echo "<ul>";
for ($i = 0; $i < sizeof($result); $i++) {
  switch ($result[$i]['C_Category']) {
    case "Gre":
    //echo $result[$i]['CardID']."<br>";
    echo "<li><input type='checkbox' name='CID[]' value=".$result[$i]['CardID'].">".$result[$i]['C_text']."</li>";
    break;
  } 
}
echo "</ul>";
echo "<input type='submit' value='Lagre kortstokk'>";
echo "</form>";
?>

