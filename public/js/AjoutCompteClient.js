$(function () {
  let socket = io("/ajout-compte");

  $('#form-compte').submit(function(e) {
    e.preventDefault();

    let identifiant = $("#identifiantCompte").val();
    let mdp = $("#mdpCompte").val();

    let compte = [[
      identifiant,
      mdp
    ]];

    socket.emit("ajoutCompte", compte);
  });

  // Afficher la liste d'un select
  socket.on("liste-compte", function(listeCompte) {

    $("#listeCompte").empty ();
    $("#listeCompte").append('' +
      '<tr>' +
      '  <td>' +
      '    Identifiant' +
      '  </td>' +
      '  <td>' +
      '    Mot de passe' +
      '  </td>' +
      '  <td>' +
      '  </td>' +
      '</tr>'
    );
    listeCompte.forEach((compte, i) => {
      $("#listeCompte").append('' +
        '<tr>' +
        ' <td>' +
        compte.IDENTIFIANT +
        ' </td>' +
        ' <td>' +
        compte.MOT_DE_PASSE +
        ' </td>' +
        ' <td>' +
        '<button value="' + compte.ID_COMPTE + '" class="effacer">' +
        ' effacer' +
        '</button>' +
        ' </td>' +
        '</tr>'
      );
    });

    $('.effacer').each(function(i, boutonEffacer){
      $(boutonEffacer).on('click', function(e){
        e.preventDefault();

        idCompte = parseInt($(boutonEffacer).attr("value"));
        socket.emit("effacerCompte", idCompte);
      });
    });

  });
});
