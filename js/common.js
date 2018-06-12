var pokemonEncontrado = 0;
var pikachu = 0;
var charmander = 1;
var squirtle = 2;
var bulbasaur = 3;
var machop = 4;
var pause_map = 0;
var mute = 0;
var mainTheme;
var inimigoAudio;
var tela = 'mapa';
var enter_tecla;

var atual = pikachu;


function moveOpcoesByKey(direction){
	if(direction == 'left'){
		if($('#opcao_pegar').hasClass('hover')){
			$('#opcao_pegar').removeClass('hover');
			$('#opcao_ataque').addClass('hover');
			enter_tecla = $('#opcao_ataque');
		}
		else if($('#opcao_pokemons').hasClass('hover')){
			$('#opcao_pokemons').removeClass('hover');
			$('#opcao_fugir').addClass('hover');
			enter_tecla = $('#opcao_fugir');
		}
	}
	else if(direction == 'right'){
		if($('#opcao_ataque').hasClass('hover')){
			$('#opcao_ataque').removeClass('hover');
			$('#opcao_pegar').addClass('hover');
			enter_tecla = $('#opcao_pegar');
		}
		else if($('#opcao_fugir').hasClass('hover')){
			$('#opcao_fugir').removeClass('hover');
			$('#opcao_pokemons').addClass('hover');
			enter_tecla = $('#opcao_pokemons');
		}
	}
	else if(direction == 'up'){
		if($('#opcao_pokemons').hasClass('hover')){
			$('#opcao_pokemons').removeClass('hover');
			$('#opcao_pegar').addClass('hover');
			enter_tecla = $('#opcao_pegar');
		}
		else if($('#opcao_fugir').hasClass('hover')){
			$('#opcao_fugir').removeClass('hover');
			$('#opcao_ataque').addClass('hover');
			enter_tecla = $('#opcao_ataque');
		}
	}
	else if(direction == 'down'){
		if($('#opcao_ataque').hasClass('hover')){
			$('#opcao_ataque').removeClass('hover');
			$('#opcao_fugir').addClass('hover');
			enter_tecla = $('#opcao_fugir');
		}
		else if($('#opcao_pegar').hasClass('hover')){
			$('#opcao_pegar').removeClass('hover');
			$('#opcao_pokemons').addClass('hover');
			enter_tecla = $('#opcao_pokemons');
		}
	}
}

function moveAtaquesByKey(direction){
	if(direction == 'left'){
		if($('#attack-1').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-1').removeClass('hover');
			$('#attack-0').addClass('hover');
			enter_tecla = $('#attack-0');
		}
		else if($('#attack-3').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-3').removeClass('hover');
			$('#attack-2').addClass('hover');
			enter_tecla = $('#attack-2');
		}
	}
	else if(direction == 'right'){
		if($('#attack-0').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-0').removeClass('hover');
			$('#attack-1').addClass('hover');
			enter_tecla = $('#attack-1');
		}
		else if($('#attack-2').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-2').removeClass('hover');
			$('#attack-3').addClass('hover');
			enter_tecla = $('#attack-3');
		}
	}
	else if(direction == 'up'){
		if($('#attack-3').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-3').removeClass('hover');
			$('#attack-1').addClass('hover');
			enter_tecla = $('#attack-1');
		}
		else if($('#attack-2').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-2').removeClass('hover');
			$('#attack-0').addClass('hover');
			enter_tecla = $('#attack-0');
		}
		else if($('#attack-0').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-0').removeClass('hover');
			$('#voltar').addClass('hover');
			enter_tecla = $('#voltar');
		}
		else if($('#attack-1').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-1').removeClass('hover');
			$('#voltar').addClass('hover');
			enter_tecla = $('#voltar');
		}
	}
	else if(direction == 'down'){
		if($('#voltar').hasClass('hover')){
			$('#voltar').removeClass('hover');
			$('#attack-0').addClass('hover');
			enter_tecla = $('#attack-0');
		}
		else if($('#attack-0').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-0').removeClass('hover');
			$('#attack-2').addClass('hover');
			enter_tecla = $('#attack-2');
		}
		else if($('#attack-1').hasClass('hover') && !$('.attack-list').hasClass('disabled')){
			$('#attack-1').removeClass('hover');
			$('#attack-3').addClass('hover');
			enter_tecla = $('#attack-3');
		}
	}
}

function movePokemonsByKey(direction){
	if(direction == 'left'){
		if($('.char-container.hover').prev("li").length > 0){
			var elemento = $('.char-container.hover');
			elemento.removeClass('hover');
			elemento.prev().addClass('hover');
			enter_tecla = elemento.prev();
		}

	}
	else if(direction == 'right'){
		if($('.char-container.hover').next("li").length > 0){
			var elemento = $('.char-container.hover');
			elemento.removeClass('hover');
			elemento.next().addClass('hover');
			enter_tecla = elemento.next();
		}
	}
	else if(direction == 'up'){
		if($('#voltar').hasClass('hover') == false){
			$('.char-container.hover').removeClass('hover');
			$('#voltar').addClass('hover');
			enter_tecla = $('#voltar');
		}
	}else if(direction == 'down'){
		if($('#voltar').hasClass('hover')){
			$('#voltar').removeClass('hover');
			$('.char-container').first().addClass('hover');
			enter_tecla = $('.char-container').first();
		}
	}
}

function moveAlternativasByKey(direction){
	var first = $('.alternativa').first();
	var second = first.next();
	var third = second.next();
	var last = third.next();

	if(direction == 'left'){
		if(second.hasClass('hover')){
			second.removeClass('hover');
			first.addClass('hover');
			enter_tecla = first;
		}
		else if(last.hasClass('hover')){
			last.removeClass('hover');
			third.addClass('hover');
			enter_tecla = third;
		}
	}
	else if(direction == 'right'){
		if(first.hasClass('hover')){
			first.removeClass('hover');
			second.addClass('hover');
			enter_tecla = second;
		}
		else if(third.hasClass('hover')){
			third.removeClass('hover');
			last.addClass('hover');
			enter_tecla = last;
		}
	}
	else if(direction == 'up'){
		if(last.hasClass('hover')){
			last.removeClass('hover');
			second.addClass('hover');
			enter_tecla = second;
		}
		else if(third.hasClass('hover')){
			third.removeClass('hover');
			first.addClass('hover');
			enter_tecla = first;
		}
	}
	else if(direction == 'down'){
		if(first.hasClass('hover')){
			first.removeClass('hover');
			third.addClass('hover');
			enter_tecla = third;
		}
		else if(second.hasClass('hover')){
			second.removeClass('hover');
			last.addClass('hover');
			enter_tecla = last;
		}
	}
	
}

