var resposta_certa = 0
questoes = [

]

function equacao(that,index_hero){
	
	resposta_certa = 0;
	console.log('chegou equacao');
	clearModal1();
	$('.modal-in header').append('<h1 id="pergunta">Como simplicar a equação:<p> x + 2 = 0</p></h1>');
	$('.modal-in header').append('<h3>Efetividade ataque: <p>'+Math.floor(curAttack.hp)+'</p></h3>');
	$('.modal-in header').append('<h2 class="hidden">Não simplificou, tenta de novo!</h2>');
	$('.modal-in section').append(
		'<ul class="alternativas-list">'
		+'<li class="alternativa">Somar 2 nos dois lados da equação</li>'
		+'<li id="resposta" class="alternativa">Subtrair 2 nos dois lados da equação</li>'
		+'<li class="alternativa">Multiplicar 2 nos dois lados da equação</li>'
		+'<li class="alternativa">Dividir 2 nos dois lados da equação</li>'
		+'</ul>');
	$('.modal-out').show();
    //$('#battle').hide();
    //$('#canvas').show();
    //modalControls();
	tela = "alternativas";
	enter_tecla = $('.alternativa').first();
	enter_tecla.addClass('hover');
	alternativasClick(that,index_hero);
	/*switch(level){
		case 1:
		break;
		case 2:
		break;
		case 3:
		break;
		case 4:
		break;
	}*/

}

function clearModal1(){
  $('.modal-in header').empty();
	    console.log('Ataque alternativa gameData.hero '+ gameData.hero.attacks[0].hp);
  $('.modal-in section').empty();
  $('.modal-in footer').empty();
}

function clearModalFeedback(){
	$('.modal-in-feedback header').empty();
	$('.modal-in-feedback section').empty();
	$('.modal-in-feedback footer').empty();
}

function alternativasClick(that, index_hero){
	$('.alternativa').click(function(){
	    // attack choice is clicked
	    console.log('chegou');
	    var alternativa = $(this).attr('id');
	    if(alternativa === "resposta"){
	    	resposta_certa = 1;
	    	clearModalFeedback()
	    	$('.modal-in-feedback header').append('<h1 class="green">Parabéns você acertou!</h1>');
	    	$('.modal-in-feedback header').append('<h2>Efetividade ataque: <p>'+Math.floor(curAttack.hp)+'</p></h2>');
	    	$('.modal-in-feedback section').append('<button id="botao" class="btn btn-default">Ok</button>');
	    	$('.modal-feedback').show();
	    	$('.modal').hide();
	    	enter_tecla = $('#botao');
	    	okClick(that,index_hero);
	    }else{
	    	if($(this).hasClass('disabled')){
	    		$(this).addClass('hover');
	    		return;
	    	}
	    	curAttack.hp = Math.floor(curAttack.hp*0.5);
	    	//$(this).removeClass('alternativa');
	    	$(this).addClass('disabled');
	    	$(this).addClass('hover');
	    	clearModalFeedback()
	    	$('.modal-in header h2').addClass('hidden');
	    	$('.modal-in header h3 p').text(curAttack.hp);
	    	setTimeout(function(){
	    		$('.modal-in header h2').removeClass('hidden');
			}, 200); 
	    }
	    console.log('Ataque alternativa gameData.hero '+ gameData.hero.attacks[0].hp);
	    
	});

}

function okClick(that,index_hero){
	$('.modal-in-feedback button').click(function(){
		$('.modal-feedback').hide();

		if(resposta_certa == 1){
			setTimeout(function(){
				attackEffect(that,index_hero);
			}, 700); // espera 700 milisegundos antes de chamar a funcao attackEffect
		}
		$('.hover').removeClass('hover');
		tela = "ataques";
		enter_tecla = $("#attack-0");
		enter_tecla.addClass('hover');		
	});
}

