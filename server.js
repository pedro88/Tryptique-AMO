// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static("public"));

// Écoute des connexions Socket.IO
io.on("connection", (socket) => {
  console.log("Nouvelle connexion établie:", socket.id);

  // Réception de l'événement de sélection de logo
  socket.on("choixLogo", (logoId) => {
    console.log(`Logo choisi: ${logoId}`);
    let message = "";
    if (logoId === "facebook") {
      message = `<div class="message">Je connais tous mes amis!</div>`;
    } else if (logoId === "insta") {
      message = `<div class="message">Republier une story c'est prouver qu'on aime!</div>`;
    } else if (logoId === "tiktok") {
      message = `<div class="message">C'est une source d'informations!</div>`;
    } else if (logoId === "bereal") {
      message = `<div class="message">C'est facile de se montrer sans filtre!</div>`;
    } else if (logoId === "steam") {
      message = `<div class="message">Plus besoin de se voir en vrai!</div>`;
    } else if (logoId === "aliexpress") {
      message = `<div class="message">Qui clic, paye!</div>`;
    } else if (logoId === "snapchat") {
      message = `<div class="message">Tout ce que je partage s'efface!</div>`;
    } else {
      message = `<div class="message">vous êtes bien perdu!</div>`;
    }
    io.emit("miseAJourEcrans", message);
  });

  //Réception de l'évenement du choix OUI/NON
  socket.on("choice", (logoId) => {
    if (logoId === "facebook") {
      message = `<div class="message">Tu peux avoir l'imression de connaitre tout le monde, mais en réalité, certains de tes contactes peuvent être plus distants ou même des inconnus</div>`;
    } else if (logoId === "insta") {
      message = `<div class="message">Cela reste un geste superficiel qui ne remplace pas les vraies démonstration d'amour ou d'amitié.</div>`;
    } else if (logoId === "snapchat") {
      message = `<div class="message">Tout ce que tu envoies sur Snapchat peut, parfois, être conservé plus longtemps que prévu.</div>`;
    } else if (logoId === "bereal") {
      message = `<div class="message">Sur Bereal tu es "authentique" et "sans filtre", mais tu peux toujours prendre le temps de faire ta photo après avoir fait une mise en scène.</div>`;
    } else if (logoId === "steam") {
      message = `<div class="message">Les contacts virtuels et les contacts "réels" apportent chacun des choses différentes.</div>`;
    } else if (logoId === "aliexpress") {
      message = `<div class="message">Tu es respponsable de l'acte d'achat, mais le paiement peut être pris en charge par quelqu'un d'autre (tes parents, tes tuteurs) ou partagé.</div>`;
    } else if (logoId === "tiktok") {
      message = `<div class="message">Il est essentiel que tu vérifies la fiabilité, et que tu ne prennes pas tout pour une vérité.</div>`;
    } else {
      message = `<div class="message">vous êtes bien perdu!</div>`;
    }
    io.emit("miseAJourEcrans", message);
  });


  //   if (logoId === "facebook") {
  //     console.log("Merci d'avoir choisi le logo Facebook");
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Tu peux avoir l'imression de connaitre tout le monde, mais en réalité, certains de tes contactes peuvent être plus distants ou même des inconnus`
  //     );
  //   } else if (logoId === "insta") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Cela reste un geste superficiel qui ne remplace pas les vraies démonstration d'amour ou d'amitié.`
  //     );
  //   } else if (logoId === "snapchat") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Tout ce que tu envoies sur Snapchat peut, parfois, être conservé plus longtemps que prévu.`
  //     );
  //   } else if (logoId === "steam") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Les contacts virtuels et les contacts "réels" apportent chacun des choses différentes.`
  //     );
  //   } else if (logoId === "tiktok") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Il est essentiel que tu vérifies la fiabilité, et que tu ne prennes pas tout pour une vérité.`
  //     );
  //   } else if (logoId === "bereal") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Sur Bereal tu es "authentique" et "sans filtre", mais tu peux toujours prendre le temps de faire ta photo après avoir fait une mise en scène.`
  //     );
  //   } else if (logoId === "aliexpress") {
  //     io.emit(
  //       "miseAJourEcrans",
  //       `Tu es respponsable de l'acte d'achat, mais le paiement peut être pris en charge par quelqu'un d'autre (tes parents, tes tuteurs) ou partagé.`
  //     );
  //   } else {
  //     io.emit("miseAJourEcrans", `Toujours perdu...`);
  //   }
  // });

  // Réinitialisation des écrans
  socket.on("reset", () => {
    io.emit("resetEcrans");
  });
});

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Serveur démarré sur le port ${PORT}`)
);
