<?php 
$hero = $_POST['c'];
$login = $_POST['login'];
    //$response = array("success" => true);
    //echo json_encode($response);
$fp = fopen("json/heros/".$login.".json", "w");
// Escreve o conteúdo JSON no arquivo
$escreve = fwrite($fp, $hero);

// Fecha o arquivo
fclose($fp);
echo json_encode($login);
?>