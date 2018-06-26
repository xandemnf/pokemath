<?php
	$login = $_POST['login'];
	if(file_exists('json/heros/'.$login.'.json')){
		$arquivo[0] = file_get_contents('json/heros/'.$login.'.json');
		$arquivo[1] = ''.$login.' Carregado com sucesso!';
		echo json_encode($arquivo);
		
	}else{
		$arquivo[0] = file_get_contents('json/heros/hero_init.json');
		$arquivo[1] = 'Novo usuário: '.$login;
		echo json_encode($arquivo);
	}
?>