var resposta_certa = 0;
var questao = [];
var delay = 500;

function equacao(that,index_hero){
	
	resposta_certa = 0;
	console.log('chegou equacao');
	var ataque_nivel = that.attr('id');
	selectNivel(ataque_nivel);
	var questao_index = randomNum(questoes.length); 
	questao = questoes[questao_index];
	clearModal1();
	$('.modal-in header').append('<h1 id="pergunta">'+questao.pergunta+
		'<p>' + questao.equacao + '</p></h1>');
	$('.modal-in header').append('</div> <div class="efetividade_ataque">Efetividade Ataque: <p>'+Math.floor(curAttack.hp)+'</p></div>');
	$('.modal-in header').append('<div id="feedbacks">'
		+'<p id="feedback1" class="feedback"></p>'
		+'<p id="feedback2" class="feedback"></p>'
		+'<p id="feedback3" class="feedback"></p>'
		+'<p id="feedback4" class="feedback"></p>'
		+'<img src="img/pokemon/feedback-negativo.gif" />'
		+'</div>');
	$('.modal-in header').append('<h2 class="feedback_negativo">Não simplificou, tenta novamente!</h2>');
	$('.modal-in header').append('<h2 class="dica">'+questao.dica+'</h2>');
	$('.modal-in section').append(
		'<ul class="alternativas-list">'
		+'<li id="'+questao.alternativas[0].gabarito+'" class="alternativa">'
		+ questao.alternativas[0].descricao 
		+'<b>'+ questao.alternativas[0].feedback1 +'</b>'
		+'<b>'+ questao.alternativas[0].feedback2 +'</b>'
		+'<b>'+ questao.alternativas[0].feedback3 +'</b>'
		+'<b>'+ questao.alternativas[0].feedback4 +'</b>'
		+'</li>'//end li
		+'<li id="'+questao.alternativas[1].gabarito+'" class="alternativa">'
		+ questao.alternativas[1].descricao 
		+'<b>'+ questao.alternativas[1].feedback1 +'</b>'
		+'<b>'+ questao.alternativas[1].feedback2 +'</b>'
		+'<b>'+ questao.alternativas[1].feedback3 +'</b>'
		+'<b>'+ questao.alternativas[1].feedback4 +'</b>'
		+'</li>'//end li
		+'<li id="'+questao.alternativas[2].gabarito+'" class="alternativa">'
		+ questao.alternativas[2].descricao 
		+'<b>'+ questao.alternativas[2].feedback1 +'</b>'
		+'<b>'+ questao.alternativas[2].feedback2 +'</b>'
		+'<b>'+ questao.alternativas[2].feedback3 +'</b>'
		+'<b>'+ questao.alternativas[2].feedback4 +'</b>'
		+'</li>'//end li
		+'<li id="'+questao.alternativas[3].gabarito+'" class="alternativa">'
		+ questao.alternativas[3].descricao 
		+'<b>'+ questao.alternativas[3].feedback1 +'</b>'
		+'<b>'+ questao.alternativas[3].feedback2 +'</b>'
		+'<b>'+ questao.alternativas[3].feedback3 +'</b>'
		+'<b>'+ questao.alternativas[3].feedback4 +'</b>'
		+'</li>'//end li
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

	    	$('.modal-in-feedback header').append('<div id="feedbacks_correto">'
				+'<p id="feedback1_correto" class="feedback_correto"></p>'
				+'<p id="feedback2_correto" class="feedback_correto"></p>'
				+'<p id="feedback3_correto" class="feedback_correto"></p>'
				+'<p id="feedback4_correto" class="feedback_correto"></p>'
				+'<img src="img/pokemon/feedback-positivo.gif" />'
				+'</div>');
	    	
	    	$('.modal-in-feedback header').append('<h2>Efetividade ataque: <p>'+Math.floor(curAttack.hp)+'</p></h2>');
	    	$('.modal-in-feedback section').append('<button id="botao" class="btn btn-default">Ok</button>');
	    	feedbackQuestao(this,'_correto');
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
	    	//$(this).addClass('disabled');
	    	$(this).addClass('hover');
	    	//clearModalFeedback();

	    	feedbackQuestao(this,'');

	    	
	    	$('.feedback_negativo').delay(delay).fadeIn(200);
	    	$('.dica').delay(delay+600).fadeIn(200);
	    	//$('.modal-in header h2').addClass('hidden');
	    	$('.efetividade_ataque p').text(curAttack.hp);
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

function feedbackQuestao(alternativa,modal){
	$('.feedback').empty();
	$('.feedback').hide();
	$('.feedback_negativo').hide();
	$('.dica').hide();
	var primeiro = $(alternativa).children().first();
	var segundo = $(primeiro).next();
	var terceiro = $(segundo).next();
	var quarto = $(terceiro).next();

	$('#feedbacks'+modal).show();
	if(!$.isEmptyObject($(primeiro).text())){
		$('#feedback1'+modal).append($(primeiro).clone()).slideDown(400);
	}
	if(!$.isEmptyObject($(segundo).text())){
		$('#feedback2'+modal).append($(segundo).clone()).delay(500).slideDown(400);
		delay = 1000;
	}	
	if(!$.isEmptyObject($(terceiro).text())){
		$('#feedback3'+modal).append($(terceiro).clone()).delay(1000).slideDown(400);
		delay = 1500;
	}
	if(!$.isEmptyObject($(quarto).text())){
		$('#feedback4'+modal).append($(quarto).clone()).delay(1500).slideDown(400);
		delay = 2000;
	}

}

function selectNivel(nivel){
	if(nivel == 'attack-0'){
		questoes = questoes1;
	}
	else if(nivel == 'attack-1'){
		questoes = questoes2;
	}
	else if(nivel == 'attack-2'){
		questoes = questoes3;
	}
	else if(nivel == 'attack-3'){
		questoes = questoes1;
	}
}

