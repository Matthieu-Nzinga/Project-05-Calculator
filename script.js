// { calculate } import './calculator';

// TODO: Faire la manipulation du DOM dans ce fichier


const ac = document.getElementById('reset');
  const c = document.getElementById('clear');
  const plusOuMoins = document.getElementById('plusoumoins');
  const pourcentage = document.getElementById('percentage');
  const division = document.getElementById('divideby');
  const multiplication = document.getElementById('times');
  const soustraction = document.getElementById('minus');
  const addition = document.getElementById('plus');
  const egalites = document.getElementById('equals');

  const listButtons = document.getElementsByClassName("digit");
  const buttonpoint = document.querySelector(".dot");

  const inputAffichager = document.getElementById("input");
  const labelHistoryque = document.getElementById("calcul");

  let numeroCourant = "";
  let operateurCourant = "";
  let calculEnCours = "";
  let operateurPresse = false;
 


  window.addEventListener("load", () => {
    inputAffichager.value = '0';
  });

  window.addEventListener("keydown", function (event) {
    event.preventDefault();
    
  });

  for (let i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener("click", function () {
      operateurPresse = false;
      const element = listButtons[i].textContent.trim();

      if (numeroCourant === "0") {
        numeroCourant = element;
      } else {
        numeroCourant += element;
      }

      inputAffichager.value = numeroCourant;
    });
  }

  buttonpoint.addEventListener("click", function () {
    if (!numeroCourant.includes(".")) {

      numeroCourant += ".";
      inputAffichager.value = numeroCourant;
    }
  });

  plusOuMoins.addEventListener("click", function () {

    numeroCourant = (parseFloat(numeroCourant) * -1).toString();
    inputAffichager.value = numeroCourant;
  });

  pourcentage.addEventListener("click", function (event) {
    event.preventDefault();

    numeroCourant = (parseFloat(numeroCourant) / 100).toString();
    inputAffichager.value = numeroCourant;
    labelHistoryque.textContent = numeroCourant;
  });

  c.addEventListener("click", function (event) {
    event.preventDefault();
    numeroCourant = "";
    operateurCourant = "";
    calculEnCours = "";
    inputAffichager.value = 0;
    // if (numeroCourant.length > 0) {
    //   numeroCourant = numeroCourant.slice(0, -1)
    //   inputAffichager.value = numeroCourant;
    // }
  });

  ac.addEventListener("click", function (event) {
    event.preventDefault();
    numeroCourant = "";
    operateurCourant = "";
    calculEnCours = "";
    inputAffichager.value = 0;
    labelHistoryque.textContent = "";
    
  });

  

  function operateurs(newOperator) {
    if (numeroCourant !== "" && operateurPresse==false) {
      operateurCourant = newOperator;
      calculEnCours += " " + numeroCourant + " " + operateurCourant;
      labelHistoryque.textContent = calculEnCours;
      operateurPresse = true;
      numeroCourant = "";
    }
    else{
      labelHistoryque.textContent = labelHistoryque.textContent.slice(0, -1) + ' ' + newOperator;
      calculEnCours = calculEnCours.slice(0, -1) + ' ' + newOperator;
    }
  }


  // function operateurs(newOperator) {
  //   if (numeroCourant !== "") {
  //     operateurCourant = newOperator;
  //     calculEnCours += " " + numeroCourant + " " + operateurCourant;
  //     labelHistoryque.textContent = calculEnCours;
  //     numeroCourant = "";
  //   }
  // }

  division.addEventListener("click", function (event) {
    event.preventDefault();
    operateurs("/");
  });

  multiplication.addEventListener("click", function (event) {
    event.preventDefault();
    operateurs("*");
  });

  soustraction.addEventListener("click", function (event) {
    event.preventDefault();
    operateurs("-");
  });

  addition.addEventListener("click", function (event) {
    event.preventDefault();
    operateurs("+");
  });

  egalites.addEventListener("click", function (event) {
    event.preventDefault();
    if (numeroCourant !== "" && operateurCourant !== "") {
      calculEnCours += numeroCourant;
      labelHistoryque.textContent = calculEnCours + " =";
      let resultat;

      switch (operateurCourant) {
        case "+":
        case "-":
        case "*":
          resultat = eval(calculEnCours);
        break;
          case "/":
            if (numeroCourant !== "0") {
              resultat = eval(calculEnCours);
            } else {
              inputAffichager.value = "Division par 0 est impossible";
              labelHistoryque.textContent = "";
              return;
            }
          
          break;
        default:
          break;
      }

      if (typeof resultat !== "undefined") {
        inputAffichager.value = resultat.toString();
        numeroCourant = resultat.toString();
        operateurCourant = "";
        calculEnCours = "";
      }
    }
  });