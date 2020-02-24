$(function () {
  let socket = io();
  // Sert à la couleur d'arrière plan des messages
  let messagePaire = true;

  $("body").css("margin-bottom", $("#form-chat .form-row").outerHeight());
  $("#liste-utilisateur").height($(window).height() - $("#form-chat .form-row").outerHeight());

  // Option du formulaire de connexion (modal)
  $("#modal-pseudo").modal({
    backdrop: 'static',
    show: true
  });

  // On écoute le formulaire de connexion avant d'accéder au chat
  $('#form-pseudo').submit(function(e) {
    e.preventDefault();

    // On cache le modal
    $("#modal-pseudo").modal('hide');
    let username = $("#input-pseudo").val();
    // Vérification de l'input, on a un pseudo par défaut
    if(username == null || username.trim() == '') {
      username = "Anonyme";
    }
    socket.emit("username", username);

    // Input du chat
    $('#form-chat').submit(function(e) {
      e.preventDefault();
      let message = {
        text : $('#input-chat').val()
      }
      if (message.text.trim().length !== 0) { // Vérifie qu'on n'envoie pas un message vide
        socket.emit('message-chat', message); // Emet en broadcast le message sur l'écouteur "chat message"
        $('#input-chat').val(''); // On efface le chat après envoie du message
      }
      $('#input-chat').focus();
    });

    // Réception d'un message du chat
    socket.on('message-chat', function(message) {
      if(messagePaire) {
        $('#messages').append('<div class="message-chat border-bottom"><p>' + message + '</p></div>');
      }
      else {
        $('#messages').append('<div class="message-chat border-bottom text-white bg-secondary"><p>' + message + '</p></div>');
      }
      messagePaire = swapBoolean(messagePaire);
      $('html, body').scrollTop($(document).height());
    });

    // Réception d'une connexion d'un utilisateur
    socket.on('message-connexion', function(message) {
      $('#messages').append('<div class="message-chat border-bottom text-white bg-info"><p>' + message + '</p></div>');
      $('html, body').scrollTop($(document).height());
    });

    // Réception d'une déconnexion d'un utilisateur
    socket.on('message-deconnexion', function(message) {
      $('#messages').append('<div class="message-chat border-bottom text-white bg-danger"><p>' + message + '</p></div>');
      $('html, body').scrollTop($(document).height());
    });

    // Réception de la liste des utilisateurs
    socket.on('list-user', function(listeUtilisateur) {
      $('#liste-utilisateur .card-text').remove();
      listeUtilisateur.forEach((user, i) => {
        $('#liste-utilisateur .card-body').append('<p class="card-text border-bottom">' + user.username + '</p>');
      });
    });

  });

  function swapBoolean(boolean) {
    if(boolean) {
      return false;
    }
    return true;
  }
});
