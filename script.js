let marcheContainer = document.getElementById('marcheContainer');
let marcheArr = JSON.parse(localStorage.getItem('marcheArr')) || [];
let cartesAchetees = JSON.parse(localStorage.getItem("cartesAchetees")) || [];

console.log(marcheArr);

// --- FONCTION D'AFFICHAGE ---
function affichageHtml(carte) {
  let div = document.createElement('div');
  div.id = `carte-${carte.id}`;
  div.className = "w-[400px] min-h-[560px]";

  div.innerHTML = `
    <img src="${carte.image}" alt="${carte.name}" class="w-full h-64 object-cover mb-2 rounded-xl">
    <h3 class="text-xl font-bold text-white mb-2">${carte.name}</h3>
    <p class="text-sm text-gray-300 mb-2">${carte.Description}</p>
    <p class="text-yellow-400 font-semibold mb-3">${carte.prix}</p>
    <p class="text-sm text-gray-400 mb-3">${carte.rare}</p>
    <div class="flex justify-center gap-2">
      <button  class="btnAcheter bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold">
        Acheter
      </button>


    </div>
  `;

  // Ajouter l'événement d'achat
  const btnAcheter = div.querySelector(".btnAcheter");
  btnAcheter.addEventListener("click", () => {
    achat(carte);         // ajoute la carte au localStorage
    alert(`${carte.name} a été achetée !`);
    afficherDeck();       // mettre à jour le deck dans Mon Deck
  });

  return div;
}
function achat(carte) {
  //  les cartes achetées dans le localStorage 
  let cartesAchetees = JSON.parse(localStorage.getItem("cartesAchetees")) || [];
  // Ajouter la carte achetée
  cartesAchetees.push(carte);
  // Sauvegarder dans le localStorage
  localStorage.setItem("cartesAchetees", JSON.stringify(cartesAchetees));
  console.log(`Carte achetée : ${carte.nom}`);
}


function afficherDeck() {
  const deckContainer = document.getElementById("deckContainer");
  if (!deckContainer) return; // si on est pas sur la page deck
  deckContainer.innerHTML = ""; // vider avant d’afficher
  let cartesAchetees = JSON.parse(localStorage.getItem("cartesAchetees")) || [];
  cartesAchetees.forEach(carte => {
    const div = document.createElement("div");
    div.className = "w-[200px] bg-gray-700 text-white rounded p-2 m-2";
    div.innerHTML = `
      <img src="${carte.image}" alt="${carte.name}" class="w-full h-32 object-cover rounded mb-1">
      <h3 class="text-sm font-bold">${carte.name}</h3>
      <p class="text-xs">Prix: ${carte.prix}</p>
      <p class="text-xs">Rareté: ${carte.rare}</p>
    `;
    deckContainer.appendChild(div);
  });
}
window.addEventListener("DOMContentLoaded", () => {
  afficherDeck();
});





//kat9leeb 3la cartes par type
async function FetchCarte() {
  try {
    const res = await fetch("./cards.json");
    const data = await res.json();
    data.forEach((carte) => {
      if (carte.rare == "common" || carte.rare == "Rare" || carte.rare == "Epique" || carte.rare == "Légendaire") {
        const cardHtml = affichageHtml(carte)
        marcheContainer.append(cardHtml);
      }
    })


    const tout = document.getElementById("tout");
    const common = document.getElementById("common");
    const Rare = document.getElementById("Rare");
    const Epique = document.getElementById("Epique");
    const Légendaire = document.getElementById("Légendaire");




    // Fonction qui affiche toutes les cartes

    function afficherToutesLesCartes(data) {
      marcheContainer.innerHTML = "";
      data.forEach((carte) => {
        const cardHtml = affichageHtml(carte);
        marcheContainer.append(cardHtml);

      });
    }


    // click tout 

    tout.addEventListener("click", () => {
      afficherToutesLesCartes(data);
    });


    //Epique
    data.forEach((carte) => {
      if (carte.rare == "Epique") {
        const cardHtml = affichageHtml(carte)
        marcheContainer.append(cardHtml);
      }
      Epique.addEventListener("click", () => {
        marcheContainer.innerHTML = "";
        data.forEach((carte) => {
          if (carte.rare == "Epique") {
            const cardHtml = affichageHtml(carte)
            marcheContainer.append(cardHtml);
          }

        }
        )

      })
    })


    //Rare
    data.forEach((carte) => {
      if (carte.rare == "Rare") {
        const cardHtml = affichageHtml(carte)
        marcheContainer.append(cardHtml);
      }
      Rare.addEventListener("click", () => {
        marcheContainer.innerHTML = "";
        data.forEach((carte) => {
          if (carte.rare == "Rare") {
            const cardHtml = affichageHtml(carte)
            marcheContainer.append(cardHtml);
          }

        }
        )



      })
    })


    //légendaire
    data.forEach((carte) => {
      if (carte.rare == "légendaire") {
        const cardHtml = affichageHtml(carte)
        marcheContainer.append(cardHtml);
      }
      Légendaire.addEventListener("click", () => {
        marcheContainer.innerHTML = "";
        data.forEach((carte) => {
          if (carte.rare == "Légendaire") {
            const cardHtml = affichageHtml(carte)
            marcheContainer.append(cardHtml);
          }

        }
        )

      })
    })

    //common
    data.forEach((carte) => {
      if (carte.rare == "common") {
        const cardHtml = affichageHtml(carte)
        marcheContainer.append(cardHtml);
      }
      Common.addEventListener("click", () => {
        marcheContainer.innerHTML = "";
        data.forEach((carte) => {
          if (carte.rare == "Common") {
            const cardHtml = affichageHtml(carte)
            marcheContainer.append(cardHtml);
          }

        }
        )

      })

    })
  }


  catch (error) {
    console.log("error");
  }
}
FetchCarte()

// ======================================
// Les zones
const playerHandContainer = document.getElementById("cartesMain");
const deckContainer = document.getElementById("cartesDeck");
const deckJoueur = document.querySelector(".deckJoueur");
const attaqueDefense = document.getElementById("attaqueDefense");
const ButtonAttaque = document.getElementById("ButtonAttaque");
const ButtonDefense = document.getElementById("ButtonDefense");
const FermerButton = document.getElementById("FermerButton");
// Affichage du deck======================================================================================================================
function afficherDeckDansJeu() {
  const cartesAchetees = JSON.parse(localStorage.getItem("cartesAchetees")) || [];
  deckContainer.innerHTML = ""; 
  cartesAchetees.forEach(carte => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "carteDeck w-[150px] h-[150px] bg-gray-700 text-white rounded p-2 m-2";
    cardDiv.id = `card-${carte.id}`;
    cardDiv.setAttribute("draggable", "true");
    cardDiv.innerHTML = `
      <img src="${carte.image}" alt="${carte.name}" class="w-full h-20 object-cover rounded mb-1">
      <h3 class="text-sm font-bold">${carte.name}</h3>
      <p class="text-xs">${carte.rare}</p>
    `;
    deckContainer.appendChild(cardDiv);
  }); 
}
// affichage initail
window.addEventListener("DOMContentLoaded", () => {
  afficherDeckDansJeu();
});
// drag et drop======================================

let draggedItem = null;
let selectedCard = null;
const MAX_MAIN = 5;
const MAX_BATAILLE = 5;

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("carteDeck")) {
    draggedItem = e.target;
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", e => {
  if (e.target.classList.contains("carteDeck")) {
    e.target.classList.remove("dragging");
    draggedItem = null;
  }
});

// Zones de drop*********************************************
[playerHandContainer, deckJoueur].forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", e => {
    e.preventDefault();
    if (!draggedItem) return;

    // Limites
    if (zone === playerHandContainer && playerHandContainer.children.length >= MAX_MAIN) {
      alert(`Tu ne peux avoir que ${MAX_MAIN} cartes à la main !`);
      return;
    }

    if (zone === deckJoueur && deckJoueur.children.length >= MAX_BATAILLE) {
      alert(`Tu ne peux mettre que ${MAX_BATAILLE} cartes sur le champ de bataille !`);
      return;
    }

    zone.appendChild(draggedItem);

    // Si c'est le champ de bataille, afficher choix attaque/défense
    if (zone === deckJoueur) {
      selectedCard = draggedItem;
      attaqueDefense.style.display = 'block';
      ButtonAttaque.disabled = false;
      ButtonDefense.disabled = false;
    }
  });
});

// ======================================
// Boutons attaque/défense
// ======================================
ButtonAttaque.addEventListener("click", () => {
  if (selectedCard) {
    selectedCard.style.border = "3px solid red";
    attaqueDefense.style.display = 'none';
    ButtonAttaque.disabled = true;
    ButtonDefense.disabled = true;
    selectedCard = null;
  }
});

ButtonDefense.addEventListener("click", () => {
  if (selectedCard) {
    selectedCard.style.border = "3px solid blue";
    attaqueDefense.style.display = 'none';
    ButtonAttaque.disabled = true;
    ButtonDefense.disabled = true;
    selectedCard = null;
  }
});

FermerButton.addEventListener("click", () => {
  attaqueDefense.style.display = 'none';
  ButtonAttaque.disabled = true;
  ButtonDefense.disabled = true;
  selectedCard = null;
});

const changeTour = document.getElementById("changeTour");
changeTour.addEventListener('click',e=>{
  fctTour();
})
function fctTour (){
  
}
