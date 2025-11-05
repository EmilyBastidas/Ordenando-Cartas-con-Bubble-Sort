import "bootstrap";
import "./style.css";


/*import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

window.onload = function() {
 const app = document.body;
  document.body.style.backgroundColor = "green";
  document.body.style.fontFamily = "'Chiron Sung HK', serif";

  const grupoContenedor = document.createElement("div");
  grupoContenedor.style.display = "flex";
  grupoContenedor.style.justifyContent = "left";
  grupoContenedor.style.gap = "20px";

  //input

  const input = document.createElement("input");
  input.type = "number";
  input.id = "numb";
  input.placeholder = "Enter number (1-20)";
  input.classList.add("form-control", "mt-3");
  input.style.width = "250px";
  input.style.marginLeft = "30px";

  //Agregue un botón de "sorteo" que, al hacer clic, hace que esas cartas en el sitio web sean hermosas

  const btnSorteo = document.createElement("button");
  btnSorteo.type = "button";
  btnSorteo.textContent = "Draw";
  btnSorteo.classList.add(
    "btn",
    "btn-danger",
    "border-dark",
    "shadow-sm",
    "mt-3"
  );

  //Agregue un botón de "clasificación" que ordene las tarjetas usando el algoritmo de clasificación selection

  const btnClasificacion = document.createElement("button");
  btnClasificacion.type = "button";
  btnClasificacion.textContent = "Sort";
  btnClasificacion.classList.add(
    "btn",
    "btn-success",
    "border-dark",
    "shadow-sm",
    "mt-3"
  );

  //inserto

  grupoContenedor.appendChild(input);
  grupoContenedor.appendChild(btnSorteo);
  grupoContenedor.appendChild(btnClasificacion);

  //contenedor de cartas

  const cardContainer = document.createElement("div");
  cardContainer.id = "card-container";
  cardContainer.style.display = "flex";
  cardContainer.style.flexDirection = "column";
  cardContainer.style.gap = "10px";
  cardContainer.style.marginTop = "50px";
  cardContainer.style.marginBottom = "50px";

  //Agrego todo al body de mi HTML

  document.body.appendChild(grupoContenedor);
  document.body.appendChild(cardContainer);

  //Función para crear HTML de una tarjeta y reutilizarla

  function createCardHTML(c) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundColor = "white";
    card.style.width = "80px";
    card.style.height = "120px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.alignContent = "center";
    card.style.padding = "5px";
    card.style.borderRadius = "4%";

    const topSymbol = document.createElement("div");
    topSymbol.textContent = c.symbol;
    topSymbol.style.color = c.color;
    topSymbol.style.fontSize = "20px";

    const number = document.createElement("div");
    number.textContent = c.number;
    number.style.fontSize = "25px";
    number.style.fontWeight = "bold";
    number.style.textAlign = "center";

    const bottomSymbol = document.createElement("div");
    bottomSymbol.textContent = c.symbol;
    bottomSymbol.style.transform = "rotate(180deg)";
    bottomSymbol.style.transformOrigin = "center";
    bottomSymbol.style.fontSize = "20px";

    //Inserto

    card.appendChild(topSymbol);
    card.appendChild(number);
    card.appendChild(bottomSymbol);
    return card; // Devuelvo el HTML de la carta
  }
  //arrays

  const numbers = [
    `A`,
    `2`,
    `3`,
    `4`,
    `5`,
    `6`,
    `7`,
    `8`,
    `9`,
    `10`,
    `J`,
    `Q`,
    `K`,
  ];
  const symbol = [`♦`, `♥`, `♠`, `♣`];

  const cards = [];

  //Convierto A,J,Q,K a números

  function getValue(num) {
    if (num === "A") return 1;
    if (num === "J") return 11;
    if (num === "Q") return 12;
    if (num === "K") return 13;
    return parseInt(num);
  }

  /* A continuación, he realizado una función que genere las cartas al azar, el usuario podrá introducir hasta 20 cartas,
 en caso de que usuario ingrese otro número, se borrarán las cartas en pantalla y se reiniciará el contador,
   como en el ejemplo de las instrucciones */

  function myFunction() {
    cardContainer.innerHTML = "";
    cards.length = 0;

    const x = parseInt(input.value);
    if (isNaN(x) || x < 1 || x > 20) {
      return;
    }

    for (let i = 0; i < x; i++) {
      let numberRandom = numbers[Math.floor(Math.random() * numbers.length)];
      let symbolRandom = symbol[Math.floor(Math.random() * symbol.length)];
      let color =
        symbolRandom === "♦" || symbolRandom === "♥" ? "red" : "black";

      cards.push({
        number: numberRandom,
        symbol: symbolRandom,
        color: color,
      });
    }
    renderCards(cards); //muestra las cartas
  }

  // Función para renderizar una fila de cartas

  function renderCards(cards) {
    const fila = document.createElement("div");
    fila.style.display = "flex"; // fila horizontal
    fila.style.gap = "10px";
    fila.style.marginTop = "10px";

    cards.forEach((c) => fila.appendChild(createCardHTML(c)));
    cardContainer.appendChild(fila); // se apila debajo de la fila anterior
  }

  // aplico bubbleSort

  function bubbleSort() {
    const pasos = [];

    //bucle externo

    for (let i = 0; i < cards.length; i++) {
      //bucle interno para comparar números vecinos

      for (let j = 0; j < cards.length - 1 - i; j++) {
        if (getValue(cards[j].number) > getValue(cards[j + 1].number)) {
          let temp = cards[j];
          cards[j] = cards[j + 1];
          cards[j + 1] = temp;

          pasos.push([...cards]);
        }
      }
    }
    // Muestro todos los pasos uno debajo del otro

    pasos.forEach((paso) => renderCards(paso));
  }

  //coneto mis botones para que cuando el usuario haga click se active la función que corresponde

  btnSorteo.addEventListener("click", myFunction);
  btnClasificacion.addEventListener("click", bubbleSort);
};
