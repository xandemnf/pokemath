/**
 * Pokemon HTML5 canvas game
 * @version 1.0.0
 * @author Panagiotis Vourtsis <vourtsis_pan@hotmail.com>
 */

window.onload = function() {
  "use strict";

  populateQuestoes();
  var directionMove = "parado";
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = document.getElementById("canvas").offsetWidth;
  var h = document.getElementById("canvas").offsetHeight;
  var terrainImageLoaded = false,
    houseImageLoaded = false,
    pokeballImageLoaded = false,
    playerImageLoaded = false,
    gramaImageLoaded = false;
  var objectSizes = 20;
  var speed = 50;
  var modifier = 100;
  var score = 0;
  var pokemons_position = [
                          [4,-1,-1,-1,-1,-1,-1,-1,-1,-1,0],
                          [-1,-1,3,-1,-1,-1,4,-1,-1,-1,-1],
                          [-1,2,-1,-1,-1,-1,1,-1,-1,-1,-1],
                          [-1,-1,-1,1,0,-1,-1,-1,-1,3,-1],
                          [-1,-1,-1,1,-1,-1,2,-1,-1,-1,-1],
                          [3,-1,-1,-1,-1,-1,-1,-1,-1,-1,2]];

  //terrain image
  var terrainImage = new Image();
  terrainImage.onload = function() {
    terrainImageLoaded = true;
    assetsLoaded();
  };
  /*terrainImage.src = "https://www.dropbox.com/s/5e38o3e5mwej7gi/pokemon_terrain.jpg?raw=1";*/
  terrainImage.src = "img/cenario/pokemon_terrain.jpg";

  //house image
  var houseImage = new Image();
  houseImage.onload = function() {
    houseImageLoaded = true;
    assetsLoaded();
  };
  //houseImage.src = "https://www.dropbox.com/s/uagq684b5jbh5t5/house.png?raw=1";
  houseImage.src = "img/cenario/house.png";


  var gramaImage = new Image();
  gramaImage.onload = function() {
    gramaImageLoaded = true;
    assetsLoaded();
  };
  gramaImage.src = "img/cenario/grama.png";


  //main sound
  //var mainTheme = new Audio("https://www.dropbox.com/s/uru3oz9mxzpt5gx/main-theme.mp3?raw=1");
  mainTheme = new Audio("audio/main-theme.mp3");
  mainTheme.loop = true;
  mainTheme.volume = 0.5;
  //mainTheme.play();

  //pokeball-selection
  //var pokePick = new Audio("https://www.dropbox.com/s/weemcqn1wlxelll/pickup.mp3?raw=1");
  var pokePick = new Audio("audio/pickup.mp3");
  pokePick.volume = 0.8;

  inimigoAudio = new Audio("audio/rival.mp3");
  inimigoAudio.volume = 0.5;
  inimigoAudio.loop = true;

  //player image
  var playerImage = new Image();
  playerImage.onload = function() {
    pokeballImageLoaded = true;
    assetsLoaded();
  };
  //playerImage.src = "https://www.dropbox.com/s/wm91kb7t7j76d0d/player.png?raw=1";
  playerImage.src = "img/personagens/player.png";

  //pokeball image
  var pokeballImage = new Image();
  pokeballImage.onload = function() {
    playerImageLoaded = true;
    assetsLoaded();
  };
  //pokeballImage.src = "https://www.dropbox.com/s/biqj124larffqk9/pokeball.png?raw=1";
  pokeballImage.src = "img/pokeball.png";


  /**
   * It will hold all the pockeball data like x and y axis position
   * sprite position and item distance is for determine which item is selected from the sprite - @todo future use for knowing on score which one player picked
   * Also hold the generate position function that generates random positions if there is no collision.
   * @Object
   * @name pokeball
   */
  var pokeball = {
    x: 0,
    y: 0,
    spritePosition: 0,
    spriteItemDistance: 33
  };
  pokeball.generatePosition = function() {
    do {
      pokeball.x = Math.floor(Math.random() * 19.5) + 1;
      pokeball.y = Math.floor(Math.random() * 16.5) + 4;
    } while (check_collision(pokeball.x, pokeball.y));

    pokeball.spritePosition = Math.floor(Math.random() * 4) + 0; // get position from 0-4
  };



  /**
   * Holds all the player's info like x and y axis position, his current direction (facing).
   * I have also incuded an object to hold the sprite position of each movement so i can call them
   * I also included the move function in order to move the player - all the functionality for the movement is in there
   * @Object
   * @name pokeball
   */
  var player = {
    x: Math.round((260 / 2) / objectSizes),
    y: Math.round((280 / 2) / objectSizes),
    currentDirection: "stand",
    direction: {
      "stand": {
        x: 0,
        y: 0
      },
      "down-1": {
        x: 17,
        y: 0
      },
      "down-2": {
        x: 34,
        y: 0
      },
      "up-1": {
        x: 125,
        y: 0
      },
      "up-2": {
        x: 142,
        y: 0
      },
      "left-1": {
        x: 69,
        y: 0
      },
      "left-2": {
        x: 87,
        y: 0
      },
      "right-1": {
        x: 160,
        y: 0
      },
      "right-2": {
        x: 178,
        y: 0
      }
    }
  };
  player.move = function(direction) {
    /**
     * A temporary object to hold the current x, y so if there is a collision with the new coordinates to fallback here
     */
    var hold_player = {
      x: player.x,
      y: player.y
    };

    if(pause_map == 1){
      return;
    }

    /**
     * Decide here the direction of the user and do the neccessary changes on the directions
     */
    switch (direction) {
      case "left":
        player.x -= speed / modifier;
        if (player.currentDirection == "stand") {
          player.currentDirection = "left-1";
        } else if (player.currentDirection == "left-1") {
          player.currentDirection = "left-2";
        } else if (player.currentDirection == "left-2") {
          player.currentDirection = "left-1";
        } else {
          player.currentDirection = "left-1";
        }
        break;
      case "right":
        player.x += speed / modifier;
        if (player.currentDirection == "stand") {
          player.currentDirection = "right-1";
        } else if (player.currentDirection == "right-1") {
          player.currentDirection = "right-2";
        } else if (player.currentDirection == "right-2") {
          player.currentDirection = "right-1";
        } else {
          player.currentDirection = "right-1";
        }
        break;
      case "up":
        player.y -= speed / modifier;

        if (player.currentDirection == "stand") {
          player.currentDirection = "up-1";
        } else if (player.currentDirection == "up-1") {
          player.currentDirection = "up-2";
        } else if (player.currentDirection == "up-2") {
          player.currentDirection = "up-1";
        } else {
          player.currentDirection = "up-1";
        }

        break;
      case "down":
        player.y += speed / modifier;

        if (player.currentDirection == "stand") {
          player.currentDirection = "down-1";
        } else if (player.currentDirection == "down-1") {
          player.currentDirection = "down-2";
        } else if (player.currentDirection == "down-2") {
          player.currentDirection = "down-1";
        } else {
          player.currentDirection = "down-1";
        }

        break;

        default:
        break;
    }

    /**
     * if there is a collision just fallback to the temp object i build before while not change back the direction so we can have a movement
     */
    if (check_collision(player.x, player.y)) {
      player.x = hold_player.x;
      player.y = hold_player.y;
    }

    verificaAchouPokemon();

    /**
     * If player finds the coordinates of pokeball the generate new one, play the sound and update the score
     * ACHOU POKEBOLA
     */
   /* if (player.x == pokeball.x && player.y == pokeball.y) { // found a pokeball !! create a new one
      console.log("found a pokeball of " + pokeball.spritePosition + "! Bravo! ");
      pokePick.pause();
      pokePick.currentTime = 0;
      pokePick.play();
      score += 1;
      pokeball.generatePosition();
      //$('#canvas').hide();
      //$('#battle').show();
    }*/

    update();

  };

  /**
   * Handle all the updates of the canvas and creates the objects
   * @function
   * @name update
   */
  function update() {
    ctx.drawImage(terrainImage, 0, 0);
    ctx.drawImage(houseImage, 80, 60);
    // Desenha gramas
    for(var y=10; y <= 15; y++){
      for(var x = 5 ; x <= 15; x++){
        ctx.drawImage(gramaImage, x*objectSizes, y*objectSizes); 
      }
    }
    //Genboard
    board();

    //pokeball
    //ctx.drawImage(pokeballImage, pokeball.spritePosition * pokeball.spriteItemDistance, 0, objectSizes, objectSizes, pokeball.x * objectSizes, pokeball.y * objectSizes, objectSizes, objectSizes);

    //player
    console.log("y:", (player.y * objectSizes) / objectSizes);
    console.log("x", (player.x * objectSizes) / objectSizes);
    ctx.drawImage(playerImage, 
      player.direction[player.currentDirection].x,
      player.direction[player.currentDirection].y, 
      objectSizes - 2, 
      objectSizes, 
      player.x * objectSizes, 
      player.y * objectSizes, 
      objectSizes, objectSizes);
    
       

    //startMoveTouchAuto();
  }

  /**
   * Our function that decides if there is a collision on the objects or not
   * @function
   * @name check_collision
   * @param {Integer} x - The x axis
   * @param {Integer} y - The y axis
   */
  function check_collision(x, y) {
    var foundCollision = false;

    if (((x > 3.5 && x < 9) && y == 6) || ((x >= 5 && x < 9) && (y >= 3 && y <= 5.5))) { //collision on house
      console.log("on house");
      foundCollision = true;
    }

    if ((x < 1.5 || x > 20.5) ||
      (y < 2 || y > 20) ||
      ((y > 0 && y < 4) && (x > 19 && x <= 21)) || //right corner
      ((y > 0 && y < 4) && (x >= 1.5 && x <= 3)) || //left corner
      ((y > 18) && (x >= 1.5 && x <= 3)) || //left corner
      ((x > 17) && (y > 18 && y <= 20)) || //left corner
      ((x > 19) && (y >= 16.5 && y <= 18)) //left corner 2
    ) {
      console.log("lost on the woods");
      foundCollision = true
    }

    return foundCollision;
  }

  /**
   * Here we are creating our board on the bottom right with our score
   * @todo maybe some mute button for the future?
   * @function
   * @name board
   */
  function board() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(w - 100, h - 70, 100, 70);

    ctx.font = "18px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillText("You Found", w - 93, h - 45);

    ctx.font = "14px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillText(score + " poketballs", w - 85, h - 25);
  }

  /**
   * Decide here if all the assets are ready to start updating
   * @function
   * @name assetsLoaded
   */
  function assetsLoaded() {
    if (terrainImageLoaded == true && houseImageLoaded == true && pokeballImageLoaded == true && playerImageLoaded == true) {
      //pokeball.generatePosition();
      update();
    }
  }

  /**
   * Assign of the arrow keys to call the player move
   */
  document.onkeydown = function(e) {
    e = e || window.event;

    stopMoveTouchAuto();
    if (e.keyCode == "37"){
      moveByKey('left');
    } 
    else if (e.keyCode == "38"){
      moveByKey('up');
    } 
    else if (e.keyCode == "39"){
      moveByKey('right');
    } 
    else if (e.keyCode == "40"){
      moveByKey('down');
    } 
    else if (e.keyCode == "27"){
      $('.close').trigger("click"); //esc fecha modal
    }
    else if (e.keyCode == "13"){
      if(!enter_tecla.hasClass('disabled')){
        enter_tecla.removeClass('hover');
        enter_tecla.trigger("click"); //enter para selecionar
      }

    } 
    else if (e.keyCode == "77" || e.keyCode == "109"){ // M ou m - MUTE
      $('.mute:first').trigger("click");
    }
  };

  // MOVE ON TOCH
  $('#map')[0].addEventListener("touchstart", startTouch, false);
  $('#map')[0].addEventListener("touchmove", moveTouch, false);
     
    // Swipe Up / Down / Left / Right
    var initialX = null;
    var initialY = null;
     
    function startTouch(e) {
      console.log('chegou start');
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
      //directionMove = "";
      stopMoveTouchAuto();
    };
     
    function moveTouch(e) {
      console.log('chegou move');
      if (initialX === null) {
        return;
      }
     
      if (initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;
     
      var diffX = initialX - currentX;
      var diffY = initialY - currentY;
     
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          directionMove = "left";
          startMoveTouchAuto();
          console.log("swiped left");

        } else {
          // swiped right
          console.log("swiped right");
          directionMove = "right";
          startMoveTouchAuto();
        }  
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          console.log("swiped up");
          directionMove = "up";
          startMoveTouchAuto();
        } else {
          // swiped down
          console.log("swiped down");
          directionMove = "down";
          startMoveTouchAuto();
        }  
      }
     
      initialX = null;
      initialY = null;
       
      e.preventDefault();
  };

   function moveTouchAuto(){
      switch (directionMove) {
        case "left":
          player.move("left");
        break;
        case "right":
          player.move("right");
        break;
        case "up":
          player.move("up");
        break;
        case "down":
          player.move("down");
        break;

        default:
        break;
      }

      if(directionMove != "") {
            setTimeout(moveTouchAuto, 200);
      }
    };


    function startMoveTouchAuto() {
        moveTouchAuto();
    };

    function stopMoveTouchAuto() {
      directionMove = "";
    };

    function moveByKey(direction){
      console.log(tela);
      if(tela == 'mapa'){
        player.move(direction);
      }else if(tela == 'opcoes'){
        moveOpcoesByKey(direction); // funcao no arquivo common.js
      }else if(tela == 'ataques'){
        moveAtaquesByKey(direction); // funcao no arquivo common.js
      }else if(tela == 'pokemons'){
        movePokemonsByKey(direction); // funcao no arquivo common.js
      }else if(tela == 'alternativas'){
        moveAlternativasByKey(direction); // funcao no arquivo common.js
      }   

    }

    function verificaAchouPokemon(){
      var x,y;
      y = (player.y * objectSizes) / objectSizes;
      x = (player.x * objectSizes) / objectSizes;
      if(x >= 5 && x <= 15 && y >= 10 && y <= 15){
        console.log("graminha");
        x = Math.trunc(x) - 5;
        y = Math.trunc(y) - 10;
        if(pokemons_position[y][x] >= 0){
          pokemonEncontrado = pokemons_position[y][x];
          //pokemons_position[y][x] = 0;
          resetGame();
          $('#canvas').fadeOut(1000);
          $('#battle').slideDown(3000);
          $('.close').trigger("click");
          opcoesShow();
          pause_map=1;
          if(mute == 0){
            inimigoAudio.currentTime = 0; //Reinicia
            inimigoAudio.play();
          }
          tela = "opcoes";
          enter_tecla = $("#opcao_ataque");
          $('#opcao_ataque').addClass('hover');
          stopMoveTouchAuto();
        }
      }
      //pokemons_position
    }

    $('.mute').click(function(){
      console.log("chegou para audio");
      if(mute === 0){
        //mainTheme.pause();
        inimigoAudio.pause();
        mute = 1;
        $('#som').addClass("hidden");
        $('#mute').removeClass("hidden");
      }else{
        if(pause_map === 1){
          inimigoAudio.play();
        }
        mute = 0;
        $('#som').removeClass("hidden");
        $('#mute').addClass("hidden");
      }
  
    });

    function populateQuestoes(){
    // available questoes
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'questoes1.php',
        async: true,
        success: function(response) {
         questoes1 = response;
        }
      });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'questoes2.php',
        async: true,
        success: function(response) {
         questoes2 = response;
        }
      });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'questoes3.php',
        async: true,
        success: function(response) {
         questoes3 = response;
        }
      });
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'questoes4.php',
        async: true,
        success: function(response) {
         questoes4 = response;
        }
      });
    }


};

 