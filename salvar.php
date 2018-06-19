<?php 
$characters = $_POST['c'];
    //$response = array("success" => true);
    //echo json_encode($response);
$fp = fopen("json/characters.json", "w");
// Escreve o conteúdo JSON no arquivo
$escreve = fwrite($fp, $characters);

// Fecha o arquivo
fclose($fp);
echo $characters;
?>