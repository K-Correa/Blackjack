/*
2C = twp of clubs
2D = two of Diamonds
2H = two of Hearts
2S = two os swords 
*/

let deck          = [];
const tiposCartas = ['C','D','H','S'];
const especiales  = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosMaquina = 0;

//Referencias al HTML
const divCartasComputadora = document.querySelector('#maquina-cartas');
const divCartasJugador = document.querySelector('#jugador-cartas');

const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small')


//funcion para crear un nuevo deck de cartas 
const crearDeck = () => {

    for (let i = 2; i <= 10; i++){
        
        for(let tipo of tiposCartas){
            deck.push(i + tipo);
        }
    }

    for (let tipo of tiposCartas){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
}

crearDeck();

//funcion para tomar una carta

const pedirCarta= () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();


    console.log(deck);
    //console.log(carta);
    return carta;

}
//#region 
// for(let i= 0; i <= 100; i++){
//     pedirCarta();
// }
//#endregion
pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    //#region 

    //let puntos = 0;
    //console.log({valor})

    // if(isNaN( valor )){
    //     puntos = ( valor === 'A')? 11 : 10;
    // }else{
    //     puntos = valor * 1;
    // }
    // console.log(puntos)
    //#endregion
    return (isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}
// const valor = valorCarta(pedirCarta());
// console.log({valor})


//turno de la computadora

const turnoComputadora =(puntosMinimos) => {

    do{

    const carta = pedirCarta();
   
    puntosMaquina = puntosMaquina + valorCarta(carta);
    puntosHTML[1].innerText = puntosMaquina;

    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);
    
    if(puntosMinimos > 21){
        break;
    }

    }while( (puntosMaquina < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        
    
    if(puntosMaquina === puntosMinimos){
        alert('Empate')
    }else if(puntosMinimos > 21 ){
        alert('La maquina gana!')
    }else if(puntosMaquina > 21){
        alert('Haz ganado!')
    }else{
        alert('La maquina gana!')
    }
   }, 10);
}

//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
   
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    //<img class="carta" src="assets/cartas/10H.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);

    }else if(puntosJugador === 21){
        console.warn('Ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {


    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

})

btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = crearDeck();
    puntosJugador = 0;
    puntosMaquina = 0;

    puntosHTML[0].innerHTML = 0;
    puntosHTML[1].innerHTML = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    
})