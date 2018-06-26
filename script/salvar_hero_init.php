<?php 
$hero = utf8_decode($_POST['c']);
    //$response = array("success" => true);
    //echo json_encode($response);
$fp = fopen("../json/heros/hero_init.json", "w");
// Escreve o conteúdo JSON no arquivo
$escreve = fwrite($fp, $hero);

// Fecha o arquivo
fclose($fp);
echo $hero;
?>