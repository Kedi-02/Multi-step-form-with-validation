/**
  Step 1:
   - Forrige knappen er skjult (hidden attr er aktive)
   - Kun steg 1 i nav er grønn (har klassen active)
   - Skjema for navn vises
  Step 2:
   - Forrige knappen er synlig (hidden attr er borte)
   - Kun steg 2 i nav er grønn (har klassen active)
   - Skjema for epost vises
  Step 3:
   - Forrige knappen er synlig
   - Kun steg 3 i nav er grønn (har klassen active)
   - Skjema for alder vises
   - Neste knappen er skjult (hidden attr er aktive)
   - Send knappen er synlig (hidden attr er borte)
  Step 4:
   - Skjema er skjult
   - Kun teksten "Takk ditt skjema er sendt" vises og lages med JavaScript
  Next:
   - Skal endre hvilket step vi er på (hvilket steg som er grønt)
   - Skal trigge validering av skjema
     - Skal vise feilmelding "Feil" hvis validering feiler
     - Skal fjerne feilmelding "Feil" hvis validering passerer etter at vi har hatt en feil (legge til hidden attr)
          - Validering for navn er mellomrom og mer enn 10 bokstaver
          - Validering for e-post er at den må ha en @
          - Validering for alder er over 20
   - Skal lagre det vi skrev i skjema
  Prev:
   - Skal endre hvilket steg vi er på
   - Skal fortsatt vise det vi har skrevet i input
 */

//Henter seksjon-elementene, og lager const-variabler

const stepOne = document.getElementById("step_one");
const stepTwo = document.getElementById("step_two");
const stepThree = document.getElementById("step_three");

//Henter knappene "next", "prev" og "send" med Id-ene, og lager const-variabler ut av disse.
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const sendBtn = document.getElementById("send");

//Henter html element for å kunne skrive ut send.
const textSend = document.getElementsByTagName("main");
const sent = textSend.item(0);

//Tar tak i listeelementene hvor vi skal endre active klassen.
const list = document.getElementsByTagName("li");
const li1 = list.item(0);
const li2 = list.item(1);
const li3 = list.item(2);

//Tar tak i spanen med errormeldinger, skrives ut til riktig steg.
const errorMsg = document.getElementsByClassName("error");
const error1 = errorMsg.item(0);
const error2 = errorMsg.item(1);
const error3 = errorMsg.item(2);

//Variabel til counter for å matche.
let counter = 1;

//Funksjonen endrer grensesnittet til neste steg.
const next = () => {
  counter++;

  if (counter === 2) {
    li1.classList.remove("active");
    li2.classList.add("active");

    document.getElementById("step_one").hidden = true;
    document.getElementById("step_two").hidden = false;
    document.getElementById("step_three").hidden = true;

    document.getElementById("prev").hidden = false;
  }

  if (counter === 3) {
    li2.classList.remove("active");
    li3.classList.add("active");

    document.getElementById("step_two").hidden = true;
    document.getElementById("step_three").hidden = false;

    document.getElementById("next").hidden = true;
    document.getElementById("send").hidden = false;
  }
};

//Funksjonen kjøres når forrige-knappen trykkes.
const prev = () => {
  counter--;

  if (counter === 1) {
    li1.classList.add("active");
    li2.classList.remove("active");

    document.getElementById("step_one").hidden = false;
    document.getElementById("step_two").hidden = true;
    document.getElementById("prev").hidden = true;
  }

  if (counter === 2) {
    li3.classList.remove("active");
    li2.classList.add("active");

    document.getElementById("step_one").hidden = true;
    document.getElementById("step_two").hidden = false;
    document.getElementById("step_three").hidden = true;

    document.getElementById("next").hidden = false;
    document.getElementById("send").hidden = true;
  }
};

//Validering av navn
const validateName = () => {
  const name = document.getElementById("name").value;

  const validName = " ";

  if (name.length > 10 && name.includes(validName)) {
    error1.hidden = true;
    next();
  } else {
    error1.hidden = false;
    error1.innerHTML = "Feil";
  }
};

//Validering av email
const validateEmail = () => {
  const email = document.getElementById("email").value;

  const validEmail = "@";

  if (email.length > 10 && email.includes(validEmail)) {
    error2.hidden = true;
    next();
  } else {
    error2.hidden = false;
    error2.innerHTML = "Feil";
  }
};

//eventlistener for klikk av send-knappen
sendBtn.addEventListener("click", (event) => {
  validateAge();
});

//Validering for alder
const validateAge = () => {
  const age = document.getElementById("age").value;

  if (age >= 18) {
    error3.hidden = true;
    sendFunction();
  } else {
    error3.hidden = false;
    error3.innerHTML = "Feil";
  }
};

//Legger til addEventListeners på på knappene, slik at de kan trykkes på uten onclick.

nextBtn.addEventListener("click", (event) => {
  if (counter === 1) {
    validateName();
  } else if (counter === 2) {
    validateEmail();
  } else if (counter === 3) {
    validateAge();
  }
});

prevBtn.addEventListener("click", (event) => {
  prev();
});

//Denne skal skrive ut takke-melding etter submit.
const sendFunction = () => {
  document.getElementsByTagName("form").hidden = true;
  document.getElementById("step_three").hidden = true;
  document.getElementById("prev").hidden = true;
  document.getElementById("send").hidden = true;
  li1.hidden = true;
  li2.hidden = true;
  li3.hidden = true;

  sent.innerHTML = "Takk, ditt skjema er sendt!";
};

let form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
