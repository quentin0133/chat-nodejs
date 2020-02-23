function ajouteEvent(objet, typeEvent, nomFonction, typePropagation){
	if (objet.addEventListener){
		objet.addEventListener(typeEvent, nomFonction, typePropagation);
	}
	else if (objet.attachEvent) 		{
		objet.attachEvent('on'+typeEvent, nomFonction);
	}
}

function selectButton() {
	let checkButtonActeur = document.getElementById('estActeur');

	if(checkButtonActeur != null)
		ajouteEvent (checkButtonActeur, 'click', ajoutFormulaireActeur, false);
}

window.onload = function () {
 selectButton();
}

function ajoutFormulaireActeur() {
	let checkButton = document.getElementById('estActeur');
	let form = document.getElementById('formActeur');
	if(checkButton.checked)
		form.style.display = "inline";
	else
		form.style.display = "none";
}
