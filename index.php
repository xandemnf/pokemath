<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>POKEMATH</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="img/icon.png" type="image/x-icon"/>
  
  <script src="js/common.js"></script>
  <link rel="stylesheet" href="css/bootstrap.min.css">

  <link rel="stylesheet" href="css/style.css">

  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"> -->
  <link rel="stylesheet" href="css/reset.min.css">

  
  <link rel="stylesheet" href="css/style_battle.css">

  <link rel="stylesheet" href="css/style_matematica.css">


  
</head>

<body>

  <html>
  <head lang="en">
    <meta charset="UTF-8">
    <title>Pokemon Game</title>
    <!-- <script src="https://code.jquery.com/jquery-1.9.1.js"></script> -->
    <!-- <script src="js/jquery-1.9.1.js"></script> -->
    <script src="canvas.pokemon.js"></script>

  </head>
  <body>
    <div id="menu" class="hidden">
      <div class="salvar_game">
        <img src="img/save.png" />
        <p>Salvar(S)</p>
      </div>
      <div class="volume">
        <img src="img/audio-mute.png" id="mute" class="mute hidden"/>
        <img src="img/volume.png" id="som" class="mute"/>
        <p>Mute(M)</p>
      </div>
      <div class="ajuda">
        <img src="img/help.png" />
        <p>Ajuda(A)</p>
      </div>
    </div>
    <div id="inicial">
      <div class="row">
        <div class="pokebola_inicial">
          <img src="img/icon.png">
        </div>
        <div class="titulo">
          <h1>POKEMATH</h1>
        </div>
      </div>
        <div class="form-group">
          <input type="text" class="form-control" id="inputLogin" placeholder="Login" required/>
          <p class="login_obrigatorio" style="color:red; display: none; padding-top: 10px;">Campo obrigatório!</p>
        </div>
        <button id="entrarLogin" class="btn btn-primary">Entrar</button>
    </div>
    
    <div id="battle" style="display:none">

      <main>

        <section class="stadium">
          <section class="enemy"></section>
          <section class="hero"></section>
        </section>

        <ul class="continuar hidden"><li>Continuar</li></ul>
        <ul class="voltar hidden"><li id="voltar" class="hover">Voltar</li></ul>
        <ul class="characters hidden"></ul>
        <ul class="hidden attack-list"></ul>
        <ul class="opcoes-list"></ul>
      </main>


      <div class="audio">
        <audio class="sfx"></audio>
        <audio class="music" loop></audio>
      </div>
      <!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>-->
    </div>
    <div id="map">
      <canvas id="canvas" width="460" height="460"></canvas>
    </div>
    <div id="modal-principal">
      <div class="modal modal-out">
        <div class="modal-in">
          <header></header>
          <section></section>
          <footer></footer>
        </div>
      </div>
    </div>
    
    <div id="modal_aux">
    <div class="modal modal-out">
      <div class="modal-in">
        <header></header>
        <section></section>
        <footer></footer>
      </div>
    </div>
    </div>

    <div class="modal-feedback">
      <div class="modal-in-feedback">
        <header></header>
        <section></section>
        <footer></footer>
      </div>
    </div>

    <div style="display: none" class="aux_close"></div>

    <script src='js/jquery.min.js'></script>
    <script src="js/index.js"></script>
    <script src="js/index_battle.js"></script>
    <script src="js/matematica.js"></script>

  </body>
  </html>
  <script  src="js/bootstrap.min.js"></script>
</body>

</html>
