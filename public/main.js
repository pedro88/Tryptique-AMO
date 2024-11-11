// public/main.js
const socket = io();

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


logos.forEach(logo => {

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
}



document.querySelectorAll(".logo").forEach(button => {
    button.addEventListener("click", () => {
        const logoId = button.getAttribute("data-logo");
        socket.emit("choixLogo", logoId);

        const element = document.getElementById("index");
        element.remove()

        const ouiButton = document.createElement("button");
        ouiButton.textContent = "Oui";
        ouiButton.id = "oui-btn";
        document.body.appendChild(ouiButton);
        ouiButton.addEventListener("click", () => {
            alert("OUI!")
        });

        const nonButton = document.createElement("button");
        nonButton.textContent = "Non";
        nonButton.id = "non-btn";
        document.body.appendChild(nonButton);
        nonButton.addEventListener("click", () => {
            alert("NON!")
        });


    });
});



// Réinitialisation de l'application
document.getElementById("reset-btn").addEventListener("click", () => {
    socket.emit("reset");
});
