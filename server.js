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
    if (logoId === "facebook") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo facebook!`);
    } else if (logoId === "insta") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo instagram!`);
    } else if (logoId === "tiktok") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo tiktok!`);
    } else if (logoId === "bereal") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo bereal!`);
    } else if (logoId === "steam") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo steam!`);
    } else if (logoId === "aliexpress") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo aliexpress!`);
    } else if (logoId === "snapchat") {
      io.emit("miseAJourEcrans", `vous etes bien sur le logo snapchat!`);
    } else {
      io.emit("miseAJourEcrans", `vous etes bien perdu!`);
    }
  });

  //Réception de l'évenement du choix OUI/NON
  socket.on("choice", (logoId) => {
    if (logoId === "facebook") {
      console.log("Merci d'avoir choisi le logo Facebook");
      io.emit("miseAJourEcrans", `Facebook blablabla`);
    } else if (logoId === "insta") {
      io.emit("miseAJourEcrans", `Insta blablabla`);
    } else if (logoId === "snapchat") {
      io.emit("miseAJourEcrans", `Snapchat blablabla`);
    } else if (logoId === "steam") {
      io.emit("miseAJourEcrans", `Steam blablabla`);
    } else if (logoId === "tiktok") {
      io.emit("miseAJourEcrans", `Tiktok blablabla`);
    } else if (logoId === "bereal") {
      io.emit("miseAJourEcrans", `Bereal blablabla`);
    } else if (logoId === "aliexpress") {
      io.emit("miseAJourEcrans", `Aliexpress blablabla`);
    } else {
      io.emit("miseAJourEcrans", `Toujours perdu...`);
    }
  });

  // Réinitialisation des écrans
  socket.on("reset", () => {
    io.emit("resetEcrans");
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
