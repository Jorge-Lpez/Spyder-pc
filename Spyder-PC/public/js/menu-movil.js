/*variable formulario */
const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const telefonoInput = document.querySelector("#telefono");
const correoInput = document.querySelector("#correo");
const mensajeInput = document.querySelector("#mensaje");

//Contactanos boton principal
const contactanosBtn = document.querySelector("#contactanos-button");

//variables para dirigir a servicios pages
const servicesCamara = document.querySelector("#camaras-services");
const reparacionCompus = document.querySelector("#reparacion-compus");
const redservices = document.querySelector("#red-services");
const proyectoservices = document.querySelector("#proyectos-services");
//Variables datos objeto
const datos = {
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    mensaje: ""
};
  
MyApp();

function MyApp(){

    //Evento submit en formulario
    formulario.addEventListener("submit", submitContacto);

    /*Evento en los input*/
    nombreInput.addEventListener("input", obtenerDatos);
    apellidoInput.addEventListener("input", obtenerDatos);
    telefonoInput.addEventListener("input", obtenerDatos);
    correoInput.addEventListener("input", obtenerDatos);
    mensajeInput.addEventListener("input", obtenerDatos);

    /* Dirijiendo a page services */
    servicesCamara.addEventListener("click", () => {
        window.location.href = "servicios.html";
    });

    reparacionCompus.addEventListener("click", () => {
        window.location.href = "reparacion.html";
    });

    redservices.addEventListener("click", () => {
        window.location.href = "red.html";
    });

    proyectoservices.addEventListener("click", () => {
        window.location.href = "proyectos.html";
    });

    //Funcion boton contactos principal
    contactanosBtn.addEventListener("click", function(){
        window.scroll(0, document.querySelector("#contactanos").getBoundingClientRect().y);
    });

    //Color nav nuevo

    //Funcion animaciones con gulp
    mostrarAnimacione();
}

/*Validar formulario y obtener datos*/
async function submitContacto(e){
    e.preventDefault();
  
    if(!Object.values(datos).every(dato => dato != "")){
        mostrarAlerta();
        return;
    }
    //console.log(datos);
    formulario.reset();
    await enviandoCorreo(datos);
}

function obtenerDatos(e){
    datos[e.target.name] = e.target.value;
}

function mostrarAlerta(){
    Swal.fire({
        icon: 'error',
        title: 'Error, Formulario incompleto',
        text: 'Todos los campos son obligatorios',
        confirmButtonText: `Aceptar`,
    });
}

function reiniciarDatos(){
    datos.nombre = "";
    datos.apellido = "";
    datos.telefono = "";
    datos.correo = "";
    datos.mensaje = "";
}
/*Fin validacion Formulario*/

/*Codigo animaciones con gulp */
function mostrarAnimacione(){
    gsap.to(".card3", {duration: 0, x:3000});
    gsap.to(".card3",{ duration: 2.5, rotation: 360, x:0});

    gsap.to(".card2", {duration: 0, y:3000});
    gsap.to(".card2",{ duration: 2, rotation: 360, y:0});

    gsap.to(".card1", {duration: 0, x:-3000});
    gsap.to(".card1",{ duration: 1.5, rotation: 360, x:0});

    gsap.to(".card4", {duration: 0, y:-3000});
    gsap.to(".card4",{ duration: 3, rotation: 360, y:0});
}
/* Fin animaciones con gulp */

/*Animacion al section trabajadores */
let swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});


async function enviandoCorreo(datos){
    try {
        Swal.fire({
            icon: 'success',
            title: 'Correo Enviado',
            text: 'Pronto nos contactaremos contigo.',
            confirmButtonText: `Aceptar`
        });
        //const url = `https://spyder-pc.herokuapp.com/correo`;
        const url = `https://spyder-pc.herokuapp.com/correo`;
        const resultado =  await axios.post(url, { datos });
    } catch (error) {
        console.log(error);
    }
}