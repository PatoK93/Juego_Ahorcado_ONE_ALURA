//DOM Y VARIABLES
//Para guardar las palabras ingresadas por el usuario
let arrayPalabras = [];
//Palabra elegida
let palabra;
//Para guardar las letras usadas
let letrasUsadas = [];
//Para guardar las letras erradas
let letrasErradas = [];
//Para guardar las letras acertadas
let letrasAcertadas = [];
//Palabra para fines prácticos
let palabraDinamica;
//Cotenedor Index
const divIndex = document.getElementById("divIndex");
//Capturo el input de palabra ingresada
const inputPalabra = document.getElementById("inputPalabra");
//Capturo el botón de guardado
const btnGuardar = document.getElementById("btnGuardar");
//Caputo el botón de cancelar
const btnCancelar = document.getElementById("btnCancelar");
//Capturo el botón para empezar
const btnEmpezar = document.getElementById("btnEmpezar");
//Cotenedor Ahorcado
const divAhorcado = document.getElementById("divAhorcado");
//Input caractér
let inputCaracter = document.getElementById("inputCaracter");
//Intentos restantes
const intentosRestantes = document.getElementById("intentosRestantes");
//Contador intentos restantes
let intentos = 10;
//Imagen ahorcado
const imagenAhorcado = document.getElementById("imagenAhorcado");
//Cotenedor Palabra
const divPalabra = document.getElementById("divPalabra");
//Cotenedor Espacios
const divEspacios = document.getElementById("divEspacios");
//Botón nuevo juego
const btnNuevoJuego = document.getElementById("btnNuevoJuego");
//Botón Desistir
const btnDesistir = document.getElementById("btnDesistir");


//EVENTOS 
//Evento para garantizar el ingreso único de letras mayúsculas y con un máximo de 8 caractéres
inputPalabra.addEventListener("keypress", (e) => {
    if (e.charCode < 65 || e.charCode > 90) {
        e.preventDefault();
        alert("Solo puede ingresar letras en MAYÚSCULA!!!");
    }
});

//Evento para guardar las palabras en el array
btnGuardar.addEventListener("click", () => {
    if (inputPalabra.value != "") {
        let existe = false;
        for (let index = 0; index < arrayPalabras.length; index++) {
            existe = arrayPalabras[index] == inputPalabra.value ? true : false;
            if (existe)
                break;
        }
        if (!existe) {
            arrayPalabras.push(inputPalabra.value);
            imprimir();
            inputPalabra.value = "";
        } else {
            alert("Palabra agregada previamente!!!");
        }
    } else {
        alert("Nada para ingresar!!!");
    }
});

//Evento para limpiar la palabra ingresada
btnCancelar.addEventListener("click", () => {
    if (inputPalabra.value == "") {
        alert("Nada para borar!!!");
    } else {
        inputPalabra.value = "";
    }
});

//Evento para ir al juego
btnEmpezar.addEventListener("click", () => {
    if (arrayPalabras.length != 0) {
        palabra = elegirPalabra();
        crearPalabra();
        divIndex.classList.add("display");
        divAhorcado.classList.remove("display");
    } else {
        alert("Ingrese al menos una palabra para jugar!!!");
    }
});

btnDesistir.addEventListener("click", () => {
    imagenAhorcado.setAttribute("src", "./img/piernaDer.jpg");
    for (let index = 0; index < palabra.length; index++) {
        document.getElementById(`${index}`).classList.remove("oculta");
    }
    inputCaracter.disabled = true;
    btnDesistir.disabled = true;
});

btnNuevoJuego.addEventListener("click", () => {
    inputCaracter.disabled = false;
    btnDesistir.disabled = false;
    intentos = 10;
    intentosRestantes.innerText = intentos;
    imagenAhorcado.setAttribute("src", "./img/fondoJuego.png");
    for (let index = 0; index < palabra.length; index++) {
        let letra = document.getElementById(`${index}`);
        letra.parentNode.removeChild(letra);
        let espacio = document.getElementById(`${index + 8}`);
        espacio.parentNode.removeChild(espacio);
    }
    arrayPalabras = [];
    letrasUsadas = [];
    letrasAcertadas = [];
    letrasErradas = [];
    inputCaracter.value = "";
    document.getElementById("letrasUsadas").innerText = "";
    divAhorcado.classList.add("display");
    divIndex.classList.remove("display");
    console.clear();
});

//Evento al tocar una tecla en la ventana
inputCaracter.addEventListener("keypress", (e) => {
    if (e.charCode >= 65 && e.charCode <= 90) {
        if (!letrasUsadas.includes(e.key)) {
            letrasUsadas.push(e.key);
            if (palabra.includes(e.key)) {
                palabraDinamica--;
                letrasAcertadas.push(e.key);
                for (let index = 0; index < palabra.length; index++) {
                    let letraAcertada = document.getElementById(index);
                    if (letraAcertada.innerHTML == e.key) {
                        letraAcertada.classList.remove("oculta");
                    }
                }
                if (palabraDinamica == 0) {
                    alert("Ha ganado el juego. Felicitaciones!!!");
                }
            } else {
                letrasErradas.push(e.key);
                let letraErrada = document.getElementById("letrasUsadas");
                letraErrada.innerText += e.key;
                intentosRestantes.innerText = intentos - 1;
                intentos--;
                switch (intentos) {
                    case 9:
                        imagenAhorcado.setAttribute("src", "./img/base.jpg");
                        break;
                    case 8:
                        imagenAhorcado.setAttribute("src", "./img/palo1.jpg");
                        break;
                    case 7:
                        imagenAhorcado.setAttribute("src", "./img/palo2.jpg");
                        break;
                    case 6:
                        imagenAhorcado.setAttribute("src", "./img/palo3.jpg");
                        break;
                    case 5:
                        imagenAhorcado.setAttribute("src", "./img/cabeza.jpg");
                        break;
                    case 4:
                        imagenAhorcado.setAttribute("src", "./img/cuerpo.jpg");
                        break;
                    case 3:
                        imagenAhorcado.setAttribute("src", "./img/brazoIzq.jpg");
                        break;
                    case 2:
                        imagenAhorcado.setAttribute("src", "./img/brazoDer.jpg");
                        break;
                    case 1:
                        imagenAhorcado.setAttribute("src", "./img/piernaIzq.jpg");
                        break;
                    case 0:
                        imagenAhorcado.setAttribute("src", "./img/piernaDer.jpg");
                        alert("Juego terminado. Perdiste!!!");
                        inputCaracter.disabled = true;
                        btnDesistir.disabled = true;
                        for (let index = 0; index < palabra.length; index++) {
                            document.getElementById(`${index}`).classList.remove("oculta");
                        }
                        break;
                    default:
                        break;
                }
            }
        } else {
            alert("Ese caractér ya fue utilizado!!!");
        }
    } else {
        e.preventDefault();
        alert("Solo puede ingresar letras en MAYÚSCULA!!!");
    }
    inputCaracter.value = "";
});

//FUNCIONES
//Función imprimir por consola
function imprimir() {
    console.log(inputPalabra.value);
}

//Función para elegir palabra aleatoria
function elegirPalabra() {
    console.clear();
    let palabra = arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)];
    palabraDinamica = palabra;
    palabraDinamica = new Set([...
        palabraDinamica
    ]).size;
    console.log(palabra);
    return palabra;
}

//Función para crear la palabra dinámicamente
function crearPalabra() {
    for (let index = 0; index < palabra.length; index++) {
        let letrasPalabra = document.createElement("label");
        letrasPalabra.innerText = palabra.charAt(index);
        letrasPalabra.setAttribute("id", `${index}`);
        letrasPalabra.classList.add("oculta");
        letrasPalabra.classList.add("letraExtraGrande");
        divPalabra.appendChild(letrasPalabra);

        let espacio = document.createElement("label");
        espacio.innerText = "[_]";
        espacio.setAttribute("id", `${index + 8}`);
        espacio.classList.add("letraExtraGrande");
        divEspacios.appendChild(espacio);
    }
}