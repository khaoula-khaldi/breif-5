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
  // Récupérer les cartes achetées depuis le localStorage (ou tableau vide si rien)
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
    console.error(error);
  }
}
FetchCarte()




// //les zones===============================================================================================================================================

// Sélectionner les zones
const playerHandContainer = document.getElementById("cartesMain");
const deckContainer = document.getElementById("cartesDeck");
const deckJoueur =document.querySelector(".deckJoueur")

let draggedItem = null;

// Fonction pour afficher les cartes du deck dans la zone deck
function afficherDeckDansJeu() {
  const cartesAchetees = JSON.parse(localStorage.getItem("cartesAchetees")) || [];
  deckContainer.innerHTML = ""; // khweeeeeeeeeeee fi lwel

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



  // drag sur chque carte
  const cartesDeck = document.querySelectorAll(".carteDeck");
  cartesDeck.forEach(carte => {
    carte.addEventListener("dragstart", e => {
      draggedItem = carte;
      carte.classList.add("dragging");
      console.log("drag start");
    });

    carte.addEventListener("dragend", e => {
      carte.classList.remove("dragging");
      draggedItem = null;
      console.log("drag end");
    });
  });
    // drag sur chque carte dans main
  const cartesMain = document.getElementById("cartesMain");
  cartesMain.forEach(carte => {
    carte.addEventListener("dragstart", e => {
      draggedItem = carte;
      carte.classList.add("dragging");
      console.log("drag start");
    });

    carte.addEventListener("dragend", e => {
      carte.classList.remove("dragging");
      draggedItem = null;
      console.log("drag end");
    });
  });

}

// Affichage initial
window.addEventListener("DOMContentLoaded", () => {
  afficherDeckDansJeu();
});

// Gestion du drop dans la main du joueur
playerHandContainer.addEventListener("dragover", e => {
  e.preventDefault(); // obligatoire pour autoriser le drop
});

playerHandContainer.addEventListener("drop", e => { 
  e.preventDefault();
  if (draggedItem && playerHandContainer.children.length >=5 ) {
     alert("ta main et pleine  !");
    return;
  }

   playerHandContainer.appendChild(draggedItem);
    console.log("la carte a était ajouter");
});



// Gestion du drop dans la main du joueur
deckJoueur.addEventListener("dragover", e => {
  e.preventDefault(); // obligatoire pour autoriser le drop
});

deckJoueur.addEventListener("drop", e => { 
  e.preventDefault();
  if (draggedItem && deckJoueur.children.length >=5 ) {
     alert("impossible  !");
    return;
  }

   deckJoueur.appendChild(draggedItem);
    console.log("la carte a était ajouter");
});

