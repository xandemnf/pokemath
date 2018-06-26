<?php 
$questoes = utf8_decode($_POST['c']);
$nivel = $_POST['nivel'];
    //$response = array("success" => true);
    //echo json_encode($response);
$fp = fopen("../json/questoes".$nivel.".json", "w");
// Escreve o conteúdo JSON no arquivo
$escreve = fwrite($fp, $questoes);

// Fecha o arquivo
fclose($fp);
echo $questoes;
?>