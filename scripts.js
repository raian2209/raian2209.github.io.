const selectElement1 = document.getElementById("mySelect1");

document.getElementsByClassName("contador").innerHTML = 0
cont = 0

pardecartas = 3

document.getElementById('button').addEventListener('click', d)
document.getElementById('embaralhar').addEventListener('click', d)
document.getElementById('config').addEventListener('click', declarconfig)

function declarconfig() {
  pardecartas = prompt('quantidade de pares (2 até 28)');
  while (Number(pardecartas)<2 || Number(pardecartas)>28){
    pardecartas = prompt('so aceitamos numeros entre 2 é 28')
  }
}

function d (){ fetch("./teste.txt")
.then(function (res) {
    return res.text();
})
.then(function (data) { 
    data = data.split("\n");

    // const selectedOption = selectElement1.options[selectElement1.selectedIndex];
    // const selectedValue = selectedOption.value;

    numerodecartasselecionadas = Number(pardecartas)*2
    data = data.slice(0,numerodecartasselecionadas)
   

    cont = 0
    document.getElementById('contador').innerHTML = 0
   // data = breaker(4,data)
    console.log(data)
  //  auxiliarrand = listaauxiliar(data.length)
  
    document.getElementById('output').innerHTML = data.join('')
    var m = document.getElementById('output').querySelectorAll('.memory-card1');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    // console.log(m)
    var z = enbaralhar(m)
  //   
   
    z.forEach(card => card.addEventListener('click', flipCard));

    ajustarTabuleiro();

})}

/* Calcula o tamanho de carta que melhor aproveita a tela (largura e altura),
   para que o tabuleiro caiba sem rolagem sempre que possível. */
function ajustarTabuleiro() {
  const board = document.getElementById('output');
  const cartas = board.querySelectorAll('.memory-card1').length;
  if (!cartas) return;

  const estilo = getComputedStyle(board);
  const gap = parseFloat(estilo.rowGap) || 8;
  const largura = board.clientWidth
    - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
  const altura = window.innerHeight - board.offsetTop
    - parseFloat(estilo.paddingBottom) - 8;
  const proporcao = 8 / 7; // altura / largura da carta

  let melhor = 0;
  for (let colunas = 1; colunas <= cartas; colunas++) {
    const linhas = Math.ceil(cartas / colunas);
    const porLargura = (largura - gap * (colunas - 1)) / colunas;
    const porAltura = (altura - gap * (linhas - 1)) / linhas / proporcao;
    melhor = Math.max(melhor, Math.min(porLargura, porAltura));
  }

  // nunca menor que o alvo de toque confortável, nem exageradamente grande
  melhor = Math.max(56, Math.min(melhor, 170));
  board.style.setProperty('--card-min', melhor + 'px');
}

window.addEventListener('resize', ajustarTabuleiro);
window.addEventListener('orientationchange', ajustarTabuleiro);

function listaauxiliar(n){
  auxiliarrand = []
  for (var i = 0; i < n; i++){
    auxiliarrand.push(i)
  }
  return auxiliarrand
}

function breaker(n,listcards){
  novalista = []
  cont = 0

  console.log(listcards)

  while(n*cont<listcards.length){
    if(!novalista.length){
    novalista.push(listcards.slice(0,n))
    console.log(1)
    }else{
    novalista.push("<break></break>",listcards.slice(n*cont,n*(cont+1)))
    console.log(2)
    
  }
    cont+=1
  }
  novalista = novalista.flat()
  console.log(novalista)
  return novalista
}

const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}


function contmov() {
  console.log(document.getElementsByClassName("contador").innerHTML) 
  cont = cont + 1 
  document.getElementById('contador').innerHTML = cont
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  contmov()

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  console.log(firstCard.childNodes)
  console.log(secondCard.childNodes)

console.log(firstCard.alt, secondCard.alt, firstCard,secondCard);
if (firstCard.classList.contains("marcado")) {
  const letra = firstCard.childNodes[0].alt
  console.log(letra)

firstCard.childNodes[0].src = `./img/teste-revelado/costarevelado${letra}.jpeg`;
  // do something here if the class exists
}

if (secondCard.classList.contains("marcado")) {
   const letra = secondCard.childNodes[0].alt
  console.log(letra)
   secondCard.childNodes[0].src = `./img/teste-revelado/costarevelado${letra}.jpeg`;
  
  // secondCard.setAttribute('src', './img/Robert_Oppenheimer.jpg');

  // do something here if the class exists
}




// gerado por jogo original 
  // if (firstCard.classList.contains("frente")) {
  //   console.log(firstCard.childNodes[0])
  //   firstCard.childNodes[0].setAttribute('src', './img/Robert_Oppenheimer.jpg');
  //   // do something here if the class exists
  // }

  // if (secondCard.classList.contains("frente")) {
  //   console.log(firstCard.childNodes[0])
  //   firstCard.childNodes[0].setAttribute('src', './img/Robert_Oppenheimer.jpg');

  //   // do something here if the class exists
  // }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function enbaralhar(array){ 
  array.forEach(card => {
    randomPos = Math.floor(Math.random() * 12);
    
    card.style.order = randomPos;
  
})
  return array; 
}; 