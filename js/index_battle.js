/////////////////////////////////////////////
// CONTENTS
/////////////////////////////////////////////
// VARIABLES
// UTILITIES
  // RANDOM NUMBER GENERATOR
  // CHARACTER BUILD
  // ATTACK MULTIPLIER
  // SFX PLAYER
  // HP BAR ANIMATION
// RESET
// CHARACTER CHOICE
// HERO ATTACK
// ENEMY ATTACK
// ATTACK SEQUENCE
// MODAL CONTROLS


/////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////
var music = {},
    typeSprite = '',
    types = [],
    gameData = {}
    attackName = '',
    curAttack = {},
    randInt = 0,
    enemyAttack = {},
    characters = [],
    defendProgressInt = null,
    defendProgressComplete = 0,
    progressInt = null,
    progressComplete = 0;

function buildVars(){
  // all the music for the game
  // http://downloads.khinsider.com/game-soundtracks/album/pokemon-gameboy-sound-collection
  music = {
    opening: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/aipycrsoym/101-opening.mp3",
    battle: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/fllwdebjsg/107-battle-vs-wild-pokemon-.mp3",
    victory: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/csqodhnibz/108-victory-vs-wild-pokemon-.mp3",
    pikachu: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/hpjacpzwof/170-pikachu.mp3",
    charmander: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/wfwdwleyga/149-charmander.mp3",
    squirtle: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/soagplijvq/152-squirtle.mp3",
    bulbasaur: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/gvqmhhryki/146-bulbasaur.mp3",
    machop: "http://66.90.91.26/ost/pokemon-gameboy-sound-collection/viaskmobgb/213-machop.mp3"
  }



  typeSprite = 'img/ge___energy_type_icons_by_aschefield101-d3agp02.png';
  types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];



  // the data for the game in play
  gameData = {
    step: 1,
    hero: {},
    enemy: {}
  }



  // attack variables
  attackName = '';
  curAttack = {};
  randInt = 0;
  enemyAttack = {};
  defendProgressInt = null;
  defendProgressComplete = 0;
  progressInt = null;
  progressComplete = 0;



  // available characters
  characters = [
    {
      index: 0,
      name: "pikachu",
      type: 'electric',
      weakness: ['fighting'],
      resistance: ['steel'],
      img: {
        //default: "http://vignette2.wikia.nocookie.net/all-anime-characters/images/7/7b/Cute_pikachu_with_hat_by_mlpochea-d63xlom.png/revision/latest?cb=20150108111832",
        default: "img/pokemon/Cute_pikachu_with_hat_by_mlpochea-d63xlom.png",
        //front: "http://rs1263.pbsrc.com/albums/ii631/Pokemon-Vampire-Knight-lover/pikachu_.gif~c200",
        front: "img/pokemon/pikachu_.gif_c200",
        //back: "http://vignette4.wikia.nocookie.net/pokemon/images/5/5b/Pikachu_Back_XY.gif/revision/latest?cb=20141009080948"
        back: "img/pokemon/Pikachu_Back_XY.gif"
      },
      hp: {
        current: 500,
        total: 500
      },
      attacks: [
        {
          name: "thunder jolt",
          hp: randomNum(40,20),
          avail: {
            total: 30,
            remaining: 30
          }
        },
        {
          name: "electro ball",
          hp: randomNum(60,45),
          avail: {
            total: 10,
            remaining: 10
          }
        },
        {
          name: "volt tackle",
          hp: randomNum(75,60),
          avail: {
            total: 5,
            remaining: 5
          }
        },
        {
          name: "thunder crack",
          hp: randomNum(160, 130),
          avail: {
            total: 2,
            remaining: 2
          }
        }
      ]
    },
    {
      index: 1,
      name: "charmander",
      type: 'fire',
      weakness: ['water'],
      resistance: ['grass'],
      img: {
        default: "img/pokemon/004Charmander_Pokemon_Mystery_Dungeon_Explorers_of_Sky.png",
        //default: "http://img3.wikia.nocookie.net/__cb20150330015216/pokemon/images/f/f5/004Charmander_Pokemon_Mystery_Dungeon_Explorers_of_Sky.png",
        front: "img/pokemon/Charmander.gif_c200",
        //front: "http://rs772.pbsrc.com/albums/yy9/HybridRainbow88/Charmander.gif~c200",
        back: "img/pokemon/Charmander_Back_XY.gif"
        //back: "http://vignette1.wikia.nocookie.net/pokemon/images/2/23/Charmander_Back_XY.gif/revision/latest?cb=20141009063457"
      },
      hp: {
        current: 500,
        total: 500
      },
      attacks: [
        {
          name: "ember",
          hp: randomNum(40,20),
          avail: {
            total: 30,
            remaining: 30
          }
        },
        {
          name: "flamethrower",
          hp: randomNum(60,45),
          avail: {
            total: 10,
            remaining: 10
          }
        },
        {
          name: "burning tail",
          hp: randomNum(75,60),
          avail: {
            total: 5,
            remaining: 5
          }
        },
        {
          name: "fire spin",
          hp: randomNum(160, 130),
          avail: {
            total: 2,
            remaining: 2
          }
        }
      ]
    },
    {
      index: 2,
      name: "squirtle",
      type: 'water',
      weakness: ['electric','grass'],
      resistance: ['normal','fire'],
      img: {
        default: "img/pokemon/Squirtle_Rojo_Fuego_y_Verde_Hoja.png",
        //default: "http://vignette3.wikia.nocookie.net/ssbb/images/7/79/Squirtle_Rojo_Fuego_y_Verde_Hoja.png/revision/latest?cb=20130907041944&path-prefix=es",
        front: "img/pokemon/tumblr_n9lnpepqkW1scncwdo1_500.gif",
        //front: "https://66.media.tumblr.com/ddd22fe10a485ed56a46d958c058a970/tumblr_n9lnpepqkW1scncwdo1_500.gif",
        back: "img/pokemon/Squirtle_XY_Back_Sprite.gif"
        //back: "http://vignette3.wikia.nocookie.net/pokemon/images/d/d8/Squirtle_XY_Back_Sprite.gif/revision/latest?cb=20141031154426"
      },
      hp: {
        current: 500,
        total: 500
      },
      attacks: [
        {
          name: "bubble",
          hp: randomNum(40,20),
          avail: {
            total: 30,
            remaining: 30
          }
        },
        {
          name: "water gun",
          hp: randomNum(60,45),
          avail: {
            total: 10,
            remaining: 10
          }
        },
        {
          name: "shell attack",
          hp: randomNum(75,60),
          avail: {
            total: 5,
            remaining: 5
          }
        },
        {
          name: "hydro pump",
          hp: randomNum(160, 130),
          avail: {
            total: 2,
            remaining: 2
          }
        }
      ]
    },
    {
      index: 3,
      name: "bulbasaur",
      type: 'grass',
      weakness: ['fire'],
      resistance: ['water','psychic'],
      img: {
        default: "img/pokemon/001Bulbasaur_Pokemon_Mystery_Dungeon_Explorers_of_Sky.png",
        //default: "http://vignette4.wikia.nocookie.net/pokemon/images/8/81/001Bulbasaur_Pokemon_Mystery_Dungeon_Explorers_of_Sky.png/revision/latest?cb=20150105223818",
        front: "img/pokemon/giphy.webp",
        //front: "https://media.giphy.com/media/iIWW4BM6nNWTu/giphy.gif",
        back: "img/pokemon/ShinyBulbasauranimatedback.gif_c200",
        //back: "http://rs425.pbsrc.com/albums/pp335/Grasaldrea/ShinyBulbasauranimatedback.gif~c200",
        deranged: "img/pokemon/b3617568f13aa750c57eacc45d0b2da7.gif_c200",
        //deranged: "http://rs522.pbsrc.com/albums/w348/Richtoon18/b3617568f13aa750c57eacc45d0b2da7.gif~c200",
        sleep: "img/pokemon/tumblr_msesq5uAIk1r93jsro1_500.gif",
        //sleep: "https://31.media.tumblr.com/4dd7682db26ac687ef81f0dd06794652/tumblr_msesq5uAIk1r93jsro1_500.gif"
        die: "img/pokemon/bulbasaur_died.png"
      },
      hp: {
        current: 500,
        total: 500
      },
      attacks: [
        {
          name: "tackle",
          hp: randomNum(40,20),
          avail: {
            total: 30,
            remaining: 30
          }
        },
        {
          name: "vine whip",
          hp: randomNum(60,45),
          avail: {
            total: 10,
            remaining: 10
          }
        },
        {
          name: "razor leaf",
          hp: randomNum(75,60),
          avail: {
            total: 5,
            remaining: 5
          }
        },
        {
          name: "solar beam",
          hp: randomNum(160, 130),
          avail: {
            total: 2,
            remaining: 2
          }
        }
      ]
    },
    {
      index: 4,
      name: "machop",
      type: 'fighting',
      weakness: ['psychic','electric'],
      resistance: [],
      img: {
        default: "img/pokemon/pokemon066.gif",
        //default: "http://clipart.toonarific.com/data/media/11/pokemon066.gif",
        front: "img/pokemon/066F.gif",
        //front: "http://graphics.tppcrpg.net/xy/normal/066F.gif",
        back:  "img/pokemon/Spr_b_6x_066.png"
        //back:  "http://pokeunlock.com/wp-content/uploads/2015/01/machop-2.gif"
      },
      hp: {
        current: 500,
        total: 500
      },
      attacks: [
        {
          name: "low kick",
          hp: randomNum(40,20),
          avail: {
            total: 30,
            remaining: 30
          }
        },
        {
          name: "karate chop",
          hp: randomNum(60,45),
          avail: {
            total: 10,
            remaining: 10
          }
        },
        {
          name: "seismic toss",
          hp: randomNum(75,60),
          avail: {
            total: 5,
            remaining: 5
          }
        },
        {
          name: "hundred furious punches",
          hp: randomNum(160, 130),
          avail: {
            total: 2,
            remaining: 2
          }
        }
      ]
    }
  ];
}





/////////////////////////////////////////////
// UTILITY
/////////////////////////////////////////////
// RANDOM NUMBER GENERATOR
// min is optional
function randomNum(max, min){
  // generate a random number

  // min not required
  if(min === undefined || min === '' || min === null){
    // min default value
    min = 0;
  }

  // random number, yay
  return Math.floor(Math.random() * (max - min) + min);
}



// CHARACTER BUILD
// build the character UI
function populateChar(container,character){
  // which img
  var facing = 'front';
  var classe = '';
  if(character === 'hero'){
    // we see the back of our hero
    // a real hero faces danger
    facing = 'back';
  }

  if(gameData[character].name == 'machop' && facing == 'back'){
    //classe = 'machop_back';
  }

  // build the character
  //container.empty();
  container.append('<section class="char col-12">'
    +'<div class="col-6">'
    +'<img class="'+classe+'" src="'+gameData[character].img[facing]+'" alt="'+gameData[character].name+'">'
    +'</div>'
    +'<div class="col-6">'
    +'<aside class="data"><h2>'+gameData[character].name+'</h2>'
    +'<div>'
    +'<progress max="'+gameData[character].hp.total+'"></progress>'
    +'<p><span>'+gameData[character].hp.current+'</span>/'+gameData[character].hp.total+'</p>'
    +'</div>'
    +'</div>'
    +'</aside>'
    +'</section>');
}



// ATTACK MULTIPLIER
// modify attack value for weaknesses & strengths
function attackMultiplier(attacker, curAttack){
  var defender = 'enemy';
  if(attacker === 'enemy'){
    defender = 'hero';
  }

  if(gameData[defender].weakness.indexOf(gameData[attacker].type) >= 0){
    // weakness exists
    curAttack.hp *= 2;
  }

  if(gameData[defender].resistance.indexOf(gameData[attacker].type) >= 0){
    // weakness exists
    curAttack.hp /= 2;
  }

  curAttack.hp = Math.floor(curAttack.hp);
  return curAttack.hp;
}



// SFX PLAYER
// stops music and plays sfx
function playSound(name){
  // load sfx src
  $('audio.sfx').attr('src', music[name])
  // pause game music
  $('audio.music')[0].pause();
  // character announce yourself
  $('audio.sfx')[0].play();

  // timeout to stop music at given point
  setTimeout(function(){
    // pause the sfx
    $('audio.sfx')[0].pause();
    // start the music again
    $('audio.music')[0].play();
    // reset the sfx
    $('audio.sfx')[0].currentTime = 0;
  },2000);
}


// HP BAR ANIMATION
// stop and set health bar
function setHP(){
  // stop health animation and set value
  clearInterval(defendProgressInt);
  clearInterval(progressInt);
  $('.stadium .enemy progress').val(gameData.enemy.hp.current);
  $('.stadium .hero progress').val(gameData.hero.hp.current);
}





/////////////////////////////////////////////
// RESET
/////////////////////////////////////////////
function resetGame(){
  // set default values for game variables
  buildVars();

  // clear the stadium
  $('.hero').empty();
  $('.enemy').empty();

  // reset
  $('.attack-list li').unbind('click');
  $('.attack-list').empty();
  $('.stadium .enemy').css({'padding':'0'});
  //$('.instructions p').text('Choose your hero');

  // set & start the opening game music
  $('audio.music').attr('src',music["opening"]);
  $('audio.music')[0].play();

  // empty characters
  $('.characters').empty();
  //$('.characters').removeClass('hidden');

  /*for(var i in characters){
    // build the character list
    $(".characters").append('<div class="char-container"><img src="'+characters[i].img.default+'" alt="'+characters[i].name+'"><h2>'+characters[i].name+'</h2><span class="type '+characters[i].type+'"></span></div>')
  }*/
  //characterChoice();

  opcoesShow();
  pokemonPlayerAtual();
  enemyFind();
  opcoesPlayer();
}
resetGame();
$('.logo').click(function(){resetGame();});


function pokemonPlayerAtual(){
  
  gameData.hero = characters[atual];
  
  // build my hero
  populateChar($('.stadium .hero'), 'hero');
  // variavel atual esta no common.js
  
  $('.attack-list').empty();
  for(var i in gameData.hero.attacks){
    // populate attack list
     $('.attack-list').append('<li>'
    +'<p class="attack-name"><strong>'
    +gameData.hero.attacks[i].name
    +'</strong></p><p class="attack-count"><small><span>'
    +gameData.hero.attacks[i].avail.remaining+'</span>/'
    +gameData.hero.attacks[i].avail.total+'</small>'
    +'</p></li>');
  }

  $('.attack-list').addClass('disabled');

  $('.characters').addClass('hidden');


  // update instructions
  //$('.instructions p').text('Choose your enemy');
  // set health bar value
  $('.stadium .hero progress').val(gameData.hero.hp.current);
}

function opcoesPlayer(){
  $('.opcoes-list').empty();
  $('.opcoes-list').append('<li id="opcao_ataque">Ataque</li>');
  $('.opcoes-list').append('<li id="opcao_pegar">Pegar</li>');
  $('.opcoes-list').append('<li id="opcao_fugir">Fugir</li>');
  $('.opcoes-list').append('<li id="opcao_pokemons">Pokemons</li>');
  opcoesPlayerClick();

}

function enemyFind(){
        var i = pokemonEncontrado;
        gameData.enemy = characters[i];
        /*// step 2: choose your enemy
        for(var i in characters){
          if(characters[i].name === name){
            // find and save the enemy data
            gameData.enemy = characters[i];
          }
        }*/

        // remove the enemy from the list
        var char = $(this).remove();
        // build the enemy
        populateChar($('.stadium .enemy'), 'enemy');
        // pad the stadium - give them some breathing room
        $('.stadium .enemy').css({'padding':'25px 0'});

        // update instructions
        $('.instructions p').text('Fight!!!');

        // hide the hero list
        $('.characters').children().slideUp('500', function(){
          $('.characters').addClass('hidden');
        });

        // update enemy health bar value
        $('.stadium .enemy progress').val(gameData.enemy.hp.current);

        // the enemy whimpers in fear
        //playSound(name);

        // update step to attack phase and bind click events
        gameData.step = 3;
        attackList();
}

function pokemonChoice(){
  $('.characters').empty();
  for(var i in characters){
    // build the character list
    $(".characters").append('<li id="pokemon_'+characters[i].name+'" class="char-container">'
      +'<img src="'+characters[i].img.default+'" alt="'+characters[i].name+'">'
      +'<h2>'+characters[i].name+'</h2>'
      +'<span class="type '+characters[i].type+'"></span></lis>')
  }

  characterChoice();
}

/////////////////////////////////////////////
// CHARACTER CHOICE
/////////////////////////////////////////////
function characterChoice(){
  $('.characters .char-container').click(function(){
    // you have chosen a character
    console.log('chegou choice');
    // your chosen character name
    var name = $(this).children('h2').text().toLowerCase();

        // step 1: choose your hero
        for(var i in characters){
          if(characters[i].name === name){
            // find and save your chosen hero's data
            gameData.hero = characters[i];
          }
        }
        $('.stadium .hero').empty();
        // remove the character from the available list
        var char = $(this).remove();
        // build my hero
        populateChar($('.stadium .hero'), 'hero');

        $('.attack-list').empty();
        for(var i in gameData.hero.attacks){
          // populate attack list
           $('.attack-list').append('<li>'
          +'<p class="attack-name"><strong>'
          +gameData.hero.attacks[i].name
          +'</strong></p><p class="attack-count"><small><span>'
          +gameData.hero.attacks[i].avail.remaining+'</span>/'
          +gameData.hero.attacks[i].avail.total+'</small>'
          +'</p></li>');
        }

        // OPCOES

        $('.characters').addClass('hidden');
        $('.voltar').addClass('hidden');
        $('.opcoes-list').removeClass('hidden');


        // update instructions
        //$('.instructions p').text('Choose your enemy');
        // set health bar value
        $('.stadium .hero progress').val(gameData.hero.hp.current);

        // let your hero roar
       // playSound(name);

        // move on to choosing an enemy
        gameData.step = 3;
        attackList();
        //$('.characters .char-container').trigger('click');
  });
}





/////////////////////////////////////////////
// HERO ATTACK
/////////////////////////////////////////////
function attackEnemy(that, callback){
  // attack the enemy!!!

  // name of your attack
  attackName = that.children('.attack-name').children('strong').text().toLowerCase();

  for(var i in gameData.hero.attacks){
    if(gameData.hero.attacks[i].name === attackName){
      // get chosen attack data
      curAttack = gameData.hero.attacks[i];
    }
  }

  // if there are attacks left
  if(curAttack.avail.remaining > 0){
    // attack!!!
    $('.attack-list').addClass('disabled');

    $('.hero .char img').animate(
      {
        'margin-left': '-30px',
        'margin-top': '10px'
      },
      50,
      'swing'
    );
    $('.hero .char img').animate(
      {
        'margin-left': '70px',
        'margin-top': '-10px'
      },
      50,
      'swing'
    );
    $('.hero .char img').animate(
      {
        'margin-left': '70px',
        'margin-top': '0px'
      },
      50,
      'swing'
    );

    // attack enemy
    gameData.enemy.hp.current -= attackMultiplier('hero', curAttack);

    if(gameData.enemy.hp.current <= 0){
      // Enemy is dead
      enemyDied(that);
    }else{
      // enemy is still alive (Attack!!!)

      enemySubstractHp(that);

      // wait a second to recover
      setTimeout(function(){
        // now defend that attack
        defend(that);
      }, 1000);

      opcoesShow();
    }
  }
}





/////////////////////////////////////////////
// ENEMY ATTACK (DEFEND)
/////////////////////////////////////////////
function defend(that){
  // random attack
  randInt = randomNum(gameData.enemy.attacks.length);
  enemyAttack = gameData.enemy.attacks[randInt];

  // enemy attack animation sequence
  $('.enemy .char img').animate(
    {
      'margin-right': '-30px',
      'margin-top': '-10px'
    },
    50,
    'swing'
  );
  $('.enemy .char img').animate(
    {
      'margin-right': '30px',
      'margin-top': '10px'
    },
    50,
    'swing'
  );
  $('.enemy .char img').animate(
    {
      'margin-right': '0px',
      'margin-top': '0px'
    },
    50,
    'swing'
  );

  // attack the hero
  gameData.hero.hp.current -= attackMultiplier('enemy', enemyAttack);

  if(gameData.hero.hp.current <= 0){
    // ding dong the hero's dead

    heroDied();

    //resetGame();
  }else{
    // the hero lives

    // subtract attack from enemy count
    gameData.enemy.attacks[randInt].avail.remaining--;

    // health bar animation
    defendProgressInt = setInterval(function(){
      // get current val of health bar
      var val = $('.stadium .hero progress').val();
      val--;

      // update health bar value
      $('.stadium .hero progress').val(val);

      if(val === gameData.hero.hp.current){
        // stop the interval when target is attained
        clearInterval(defendProgressInt);
        defendProgressComplete = 1;
      }
    },1);

    // update health value
    $('.stadium .hero .data p span').text(gameData.hero.hp.current);

    setTimeout(function(){
      if(defendProgressComplete && progressComplete){
        $('.attack-list').removeClass('disabled');
      }else{
        setHP();
        $('.attack-list').removeClass('disabled');
      }
    }, 500);
  }
}





/////////////////////////////////////////////
// ATTACK SEQUENCE
/////////////////////////////////////////////
function attackList(){
  // attack instantiation
  $('.attack-list').removeClass('disabled');
  console.log('chegou ataque' + gameData.step);
  $('.attack-list li').click(function(){
    // attack choice is clicked
    var doAttack = 1;

    if(gameData.step === 3){
      // attack step - start attack sequence
      attackEnemy($(this));
    }
  });

  setTimeout(function(){
    // characters chosen - set & start the battle music
    $('audio.music').attr('src',music["battle"]);
    $('audio.music')[0].play();
  },1500);
}





/////////////////////////////////////////////
// MODAL
/////////////////////////////////////////////
function modalControls(){
  $('.modal-out').click(function(){
    $(this).slideUp('400');
  });
  $('.modal-in .close').click(function(e){
    $('.modal-out').slideUp('400');
  });

  $('.modal-in').click(function(e){
    e.stopPropagation();
    e.preventDefault();
  });
}

function clearModal(){
  $('.modal-in header').empty();
  $('.modal-in section').empty();
  $('.modal-in footer').empty();
  setHP();
}

function opcoesPlayerClick(){
$('.opcoes-list li').click(function(){
    // attack choice is clicked
    var opcao = $(this).attr('id');
    console.log('chegou no click das opcoes');
    switch(opcao){
      case 'opcao_ataque':
        show(['attack-list','voltar']);
      break;
      case 'opcao_pokemons':
        opcoesPokemon();
      break;
      case 'opcao_fugir':
        clearModal();
        $('.modal-in header').append('<h1>Você fugiu da batalha!</h1><span class="close">x</span>');
        $('.modal-in section').append('<p>Não desanime!! Na próxima você consegue!');
        $('.modal-out').slideDown('400');
        modalControls();
        renderMap();
      break;
      case 'opcao_pegar':
      break;
    }
    
  });
$('.voltar').click(function(){
    opcoesShow();
});

$('.continuar').click(function(){
    clearModal();
    $('.modal-in header').append('<h1>Você Ganhou </h1><span class="close">x</span>');
    $('.modal-in section').append('<p>Parabéns!</p>');
    $('.modal-out').slideDown('400');
    modalControls();
    renderMap();
});

}

function renderMap(){
      $('#battle').hide();
      $('#canvas').show();
      pause_map = 0;
      inimigoAudio.pause();
  }

function continuarShow(){
    show('continuar');
}

function opcoesShow(){
    show('opcoes-list');
}

function show(e){
  // elementos eh um array com todas as classes dos elementos clicaveis
  var elementos = ['opcoes-list','attack-list','characters','voltar','continuar'];
  //mostrar uma lista de elementos
  if(Array.isArray(e)){
    e.forEach(function(item,indice,arr){
      var index = elementos.indexOf(item); // retorna o indice do item
      if (index > -1) { // verifica se encontrou o elemento na lista
        elementos.splice(index, 1); // retira o elemento da lista de elementos
        $('.'+item).removeClass('hidden');
      }
    });  
  }else{
    var index = elementos.indexOf(e);
    if (index > -1) {
      elementos.splice(index, 1);
      $('.'+e).removeClass('hidden');
    }
  }

  elementos.forEach(function(item,indice,arr){
    $('.'+item).addClass('hidden');
  });
  
}

function heroDied(){
    clearModal();

    $('.modal-in header').append('<h1>'+ gameData.hero.name +' morreu! :( </h1><span class="close">x</span>');
    $('.modal-in section').append('<p>Não desanime!! Escolha outro pokemon e continue lutando!');
    $('.modal-out').slideDown('400');
    //$('#battle').hide();
    //$('#canvas').show();
    modalControls();
   // $('#pokemon_'+gameData.hero.name).remove(); 
    characters.splice(gameData.hero.index, 1); //Remove o pokemon da lista
    gameData.hero.hp.current = 0;
    opcoesPokemon();
}


function enemyDied(that){
  continuarShow();
  gameData.enemy.hp.current = 0;
  enemySubstractHp(that);
  // clear the stadium of the dead
  //remove aqui$('.enemy').empty();
  // show the available characters
  //removi aqui$('.characters').removeClass('hidden');
  //removi aqui$('.characters').children().slideDown('500');
  $('.enemy .char').append('<div class="morreu">Desmaiou!</div>');
  $('.enemy .char img').addClass('die');
  $('.enemy .char img').attr('src', gameData.enemy.img.default);
  
  //gameData.enemy = {};
  // unbind click for reset
  $('.attack-list li').unbind('click');
}

function opcoesPokemon(){
  show(['characters','voltar']);
  pokemonChoice();
}

function enemySubstractHp(that){
  // subtract attack
      curAttack.avail.remaining--;

      // interval to animate health bar
      progressInt = setInterval(function(){
        // get current value of health bar
        var val = $('.stadium .enemy progress').val();
        val--;

        // update health bar value
        $('.stadium .enemy progress').val(val);
        if(val === -1 || val === gameData.enemy.hp.current){
          // if you've hit your target clear interval
          clearInterval(progressInt);
          progressComplete = 1;
        }
      },1);

      // update health numbers
      $('.stadium .enemy .data p span').text(gameData.enemy.hp.current);
      that.children('.attack-count').children('small').children('span').text(curAttack.avail.remaining);
}
