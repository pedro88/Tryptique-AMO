// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

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
    message = `<div class="message">Je connais tous mes amis !</div>`; // Ajout espace avant !
  } else if (logoId === "insta") {
    message = `<div class="message">Republier une story, c'est prouver qu'on aime !</div>`; // Ajout virgule
  } else if (logoId === "tiktok") {
    message = `<div class="message">C'est une source d'informations !</div>`; // "source" au singulier
  } else if (logoId === "bereal") {
    message = `<div class="message">C'est facile de se montrer sans filtre !</div>`;
  } else if (logoId === "steam") {
    message = `<div class="message">Plus besoin de se voir en vrai !</div>`;
  } else if (logoId === "aliexpress") {
    message = `<div class="message">Qui clique, paie !</div>`; // "clique" et "paie" conjugués
  } else if (logoId === "snapchat") {
    message = `<div class="message">Tout ce que je partage s'efface !</div>`;
  } else {
    message = `<div class="message">Vous êtes bien perdu !</div>`; // "Vous" en majuscule
  }
  io.emit("miseAJourEcrans", message);
});

// Réception de l'événement du choix OUI/NON
socket.on("choice", (logoId) => {
  if (logoId === "facebook") {
    console.log("Merci d'avoir choisi le logo Facebook");
    io.emit("miseAJourEcrans", `Tu peux avoir l'impression de connaître tout le monde, mais en réalité, certains de tes contacts peuvent être plus distants ou même des inconnus.`); // Corrections: "imression"->"impression", "connaitre"->"connaître", "contactes"->"contacts"
  } else if (logoId === "insta") {
    io.emit("miseAJourEcrans", `Cela reste un geste superficiel qui ne remplace pas les vraies démonstrations d'amour ou d'amitié.`); // "démonstration"->"démonstrations"
  } else if (logoId === "snapchat") {
    io.emit("miseAJourEcrans", `Tout ce que tu envoies sur Snapchat peut, parfois, être conservé plus longtemps que prévu.`); // Correct
  } else if (logoId === "steam") {
    io.emit("miseAJourEcrans", `Les contacts virtuels et les contacts "réels" apportent chacun des choses différentes.`); // Correct
  } else if (logoId === "tiktok") {
    io.emit("miseAJourEcrans", `Il est essentiel que tu vérifies la fiabilité des sources, et que tu ne prennes pas tout pour une vérité.`); // Ajout "des sources"
  } else if (logoId === "bereal") {
    io.emit("miseAJourEcrans", `Sur BeReal tu es "authentique" et "sans filtre", mais tu peux toujours prendre le temps de composer ta photo après avoir fait une mise en scène.`); // "Bereal"->"BeReal", "faire"->"composer"
  } else if (logoId === "aliexpress") {
    io.emit("miseAJourEcrans", `Tu es responsable de l'acte d'achat, mais le paiement peut être pris en charge par quelqu'un d'autre (tes parents ou tuteurs) ou partagé.`); // "respponsable"->"responsable", simplification
  } else {
    io.emit("miseAJourEcrans", `Toujours perdu...`);
  }
});

// Réception de l'événement Et Toi
socket.on("etToiChoice", (logoId) => {
  if (logoId === "facebook") {
    io.emit("miseAJourEcrans", `Acceptes-tu n'importe qui comme ami sur Facebook ?`);
  } else if (logoId === "insta") {
    io.emit("miseAJourEcrans", `Et toi, comment montres-tu à quelqu'un qu'il compte pour toi ?`);
  } else if (logoId === "tiktok") {
    io.emit("miseAJourEcrans", `Et toi, quand tu as une question, comment fais-tu pour vérifier la réponse ?`);
  } else if (logoId === "bereal") {
    io.emit("miseAJourEcrans", `Et toi, est-ce que c'est toujours instantané ?`);
  } else if (logoId === "steam") {
    io.emit("miseAJourEcrans", `Et toi, qu'attends-tu dans tes relations ?`);
  } else if (logoId === "aliexpress") {
    io.emit("miseAJourEcrans", `Quand tu souhaites acheter quelque chose, demandes-tu l'accord avant ?`);
  } else if (logoId === "snapchat") {
    io.emit("miseAJourEcrans", `As-tu toujours confiance quand tu envoies quelque chose sur Snap ?`);
  } else {
    io.emit("miseAJourEcrans", `Et toi, tu sais où tu te trouves ?`);
  }
});

  // Réinitialisation des écrans
  socket.on("reset", () => {
    io.emit("resetEcrans");
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Serveur démarré sur le port ${PORT}`));


