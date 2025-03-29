// public/main.js
const socket = io();

// Création de la page principale avec les logos
const mainPage = () => {
  const indexDiv = document.createElement("div");
  indexDiv.className = "index";
  indexDiv.id = "index";

  const titleParagraph = document.createElement("p");
  titleParagraph.innerHTML = "Et toi,<br> quel réseau social utilises-tu?";
  indexDiv.appendChild(titleParagraph);

  const logoContainer = document.createElement("div");
  logoContainer.className = "logoContainer";
  logoContainer.id = "logo-selection";
  indexDiv.appendChild(logoContainer);

  const logos = [
    { name: "facebook", src: "./logo/facebook.svg", alt: "Facebook" },
    { name: "insta", src: "./logo/insta.svg", alt: "Insta" },
    { name: "tiktok", src: "./logo/tiktok.svg", alt: "Tiktok" },
    { name: "bereal", src: "./logo/bereal.svg", alt: "Bereal" },
    { name: "steam", src: "./logo/steam.svg", alt: "Steam" },
    { name: "aliexpress", src: "./logo/aliexpress.svg", alt: "Aliexpress" },
    { name: "snapchat", src: "./logo/snapchat.svg", alt: "Snapchat" },
  ];

  logos.forEach((logo) => {
    const button = document.createElement("button");
    button.className = "logo";
    button.setAttribute("data-logo", logo.name);

    const img = document.createElement("img");
    img.src = logo.src;
    img.alt = logo.alt;
    img.className = "logo";

    button.appendChild(img);
    logoContainer.appendChild(button);
  });

  document.body.appendChild(indexDiv);

  // Activer le plein écran et empêcher la mise en veille
  document.addEventListener("DOMContentLoaded", () => {
    enableFullscreen();
    requestWakeLock();
  });
};

// Fonction pour activer le plein écran
function enableFullscreen() {
  const docElement = document.documentElement; // La balise <html>
  if (docElement.requestFullscreen) {
    docElement.requestFullscreen();
  } else if (docElement.webkitRequestFullscreen) {
    docElement.webkitRequestFullscreen(); // Safari
  } else if (docElement.msRequestFullscreen) {
    docElement.msRequestFullscreen(); // Edge/IE
  }
}

// Fonction pour empêcher la mise en veille
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock active');
    } else {
      console.warn('Wake Lock API non supportée sur ce navigateur.');
    }
  } catch (err) {
    console.error(`Échec de la Wake Lock: ${err.name}, ${err.message}`);
  }
}

// Fonction d'écoute des différents éléments
const addListener = () => {
  document.querySelectorAll(".logo").forEach((button) => {
    button.addEventListener("click", () => {
      const logoId = button.getAttribute("data-logo");
      socket.emit("choixLogo", logoId);

      const element = document.getElementById("index");
      if (element) element.remove();
      console.log(logoId);

      // Fonction d'inscription du message de fin sur l'écran principal + bouton reset
      const showOutro = (logoId) => {
        let message = "";
        if (logoId === "facebook") {
          message = `Acceptes-tu n'importe qui comme ami sur Facebook ?`; // Espace avant le point d'interrogation
        } else if (logoId === "insta") {
          message = `Et toi, comment montres-tu à quelqu'un qu'il compte pour toi ?`; // Accord de "montres-tu"
        } else if (logoId === "tiktok") {
          message = `Et toi, quand tu as une question, comment fais-tu pour vérifier la réponse ?`; // "une question"
        } else if (logoId === "bereal") {
          message = `Et toi, est-ce que c'est toujours instantané ?`; // "est-ce que"
        } else if (logoId === "steam") {
          message = `Et toi, qu'attends-tu dans tes relations ?`; // Trait d'union dans "attends-tu"
        } else if (logoId === "aliexpress") {
          message = `Quand tu souhaites acheter quelque chose, demandes-tu l'accord avant ?`; // "demandes-tu"
        } else if (logoId === "snapchat") {
          message = `As-tu toujours confiance quand tu envoies quelque chose sur Snap ?`; // "As-tu"
        } else {
          message = `Et toi, tu sais où tu te trouves ?`; // "tu te trouves"
        }
      
        // Conteneur du message
        let container = document.getElementById("outro-message");
        if (!container) {
          container = document.createElement("div");
          container.id = "outro-message";
          buttonContainer.appendChild(container);
        }
        container.className = "message2";
        container.innerHTML = `<div>${message}</div>`;
      
        // Création et ajout du bouton "Recommencer"
        const existingResetButton = document.getElementById("reset-btn");
        if (existingResetButton) existingResetButton.remove();
      
        const resetButton = document.createElement("button");
        resetButton.textContent = "Recommencer";
        resetButton.id = "reset-btn";
        container.appendChild(resetButton);
      
        // Gestion de l'événement "click" sur le bouton "Recommencer"
        resetButton.addEventListener("click", () => {
          socket.emit("reset");
          resetButton.remove();
          container.remove();
          mainPage();
          addListener();
        });
      };

      // Vérification de l'existence des boutons oui et non
      const existingOuiButton = document.getElementById("oui-btn");
      const existingNonButton = document.getElementById("non-btn");
      const existingButtonContainer = document.getElementById("button-container");
      if (existingButtonContainer) existingButtonContainer.remove();
      if (existingOuiButton) existingOuiButton.remove();
      if (existingNonButton) existingNonButton.remove();
      
      // Création du boutonContainer
      const buttonContainer = document.createElement("div");
      buttonContainer.id = "button-container";
      document.body.appendChild(buttonContainer);
      
      // Création du bouton oui
      const ouiButton = document.createElement("button");
      ouiButton.textContent = "Oui";
      ouiButton.id = "oui-btn";
      buttonContainer.appendChild(ouiButton);
      ouiButton.addEventListener("click", () => {
        socket.emit("choice", logoId);
        console.log(logoId);
        ouiButton.remove();
        nonButton.remove();
        outro();
      });

      // Création du bouton non
      const nonButton = document.createElement("button");
      nonButton.textContent = "Non";
      nonButton.id = "non-btn";
      buttonContainer.appendChild(nonButton);
      nonButton.addEventListener("click", () => {
        socket.emit("choice", logoId);
        console.log(logoId);
        ouiButton.remove();
        nonButton.remove();
        outro();
      });
    });
  });
};

// Appel des fonctions principales
mainPage();
addListener();



// // public/main.js
// const socket = io();

// // Fonction principale pour la page avec les logos
// const mainPage = () => {
//   const indexDiv = document.createElement("div");
//   indexDiv.className = "index";
//   indexDiv.id = "index";

//   const titleParagraph = document.createElement("p");
//   titleParagraph.innerHTML = "Et toi,<br> quel réseau social utilises-tu?";
//   indexDiv.appendChild(titleParagraph);

//   const logoContainer = document.createElement("div");
//   logoContainer.className = "logoContainer";
//   logoContainer.id = "logo-selection";
//   indexDiv.appendChild(logoContainer);

//   const logos = [
//     { name: "facebook", src: "./logo/facebook.svg", alt: "Facebook" },
//     { name: "insta", src: "./logo/insta.svg", alt: "Insta" },
//     { name: "tiktok", src: "./logo/tiktok.svg", alt: "Tiktok" },
//     { name: "bereal", src: "./logo/bereal.svg", alt: "Bereal" },
//     { name: "steam", src: "./logo/steam.svg", alt: "Steam" },
//     { name: "aliexpress", src: "./logo/aliexpress.svg", alt: "Aliexpress" },
//     { name: "snapchat", src: "./logo/snapchat.svg", alt: "Snapchat" },
//   ];

//   logos.forEach((logo) => {
//     const button = document.createElement("button");
//     button.className = "logo";
//     button.setAttribute("data-logo", logo.name);

//     const img = document.createElement("img");
//     img.src = logo.src;
//     img.alt = logo.alt;
//     img.className = "logo";

//     button.appendChild(img);
//     logoContainer.appendChild(button);
//   });

//   document.body.appendChild(indexDiv);


//   // Ajout des gestionnaires d'événements pour chaque logo
//   document.querySelectorAll(".logo").forEach((button) => {
//     button.addEventListener("click", () => {
//       const logoId = button.getAttribute("data-logo");
//       socket.emit("choixLogo", logoId);

//       const element = document.getElementById("index");
//       if (element) element.remove();
//       console.log(logoId);

//       // Code pour afficher le message de fin et le bouton reset
//       outroMessage(logoId);
//     });
//   });
// };

// // Fonction pour afficher le message de fin et les boutons "Oui" et "Non"
// function outroMessage(logoId) {
//   let message = "";
//   if (logoId === "facebook") {
//     message = `Acceptes-tu n'importe qui comme ami sur Facebook?`;
//   } else if (logoId === "insta") {
//     message = `Et toi, comment montres-tu à quelqu'un qu'il compte pour toi?`;
//   } else if (logoId === "tiktok") {
//     message = `Et toi quand tu as une question, comment fais-tu pour vérifier la réponse?`;
//   } else if (logoId === "bereal") {
//     message = `Et toi, est-ce que c'est toujours instantané?`;
//   } else if (logoId === "steam") {
//     message = `Et toi, qu'attends tu dans tes relations?`;
//   } else if (logoId === "aliexpress") {
//     message = `Quand tu souhaites acheter quelque chose, demandes-tu l'accord avant?`;
//   } else if (logoId === "snapchat") {
//     message = `As-tu toujours confiance quand tu envoies quelque chose sur Snap?`;
//   } else {
//     message = `Et toi, tu sais où tu te trouves?`;
//   }

//   // Conteneur du message
//   let container = document.getElementById("outro-message");
//   if (!container) {
//     container = document.createElement("div");
//     container.id = "outro-message";
//     document.body.appendChild(container);
//   }
//   container.className = "message2";
//   container.innerHTML = `<div>${message}</div>`;

//   // Création et ajout du bouton "Recommencer"
//   const resetButton = document.createElement("button");
//   resetButton.textContent = "Recommencer";
//   resetButton.id = "reset-btn";
//   container.appendChild(resetButton);

//   // Gestion de l'événement "click" sur le bouton "Recommencer"
//   resetButton.addEventListener("click", () => {
//     socket.emit("reset");
//     resetButton.remove();
//     container.remove();
//     mainPage();
//   });
// }

// // Appel de la fonction principale pour démarrer la page
// mainPage();
