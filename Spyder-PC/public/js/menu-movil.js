/*variable formulario */
const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const telefonoInput = document.querySelector("#telefono");
const correoInput = document.querySelector("#correo");
const mensajeInput = document.querySelector("#mensaje");

//Variables para menu responsive
const menuBtn = document.querySelectorAll(".menu-btn");
const menuContent = document.querySelector(".menu-content");
const iconoClose = document.querySelector(".menu-btn i");

//Contactanos boton principal
const contactanosBtn = document.querySelector("#contactanos-button");

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

    window.addEventListener("scroll", cambiarColor);

    //Funcion boton contactos principal
    contactanosBtn.addEventListener("click", function(){
        window.scroll(0, document.querySelector("#contactanos").getBoundingClientRect().y);
    });

    //Color nav nuevo

    //Funcion animaciones con gulp
    mostrarAnimacione();

    //Evento para mostrar menu
    menuBtn.forEach(menuTodos => {
        menuTodos.addEventListener("click", mostarMenu); 
    });
}

/*Validar formulario y obtener datos*/
async function submitContacto(e){
    e.preventDefault();
  
    if(!Object.values(datos).every(dato => dato != "")){
        mostrarAlerta();
        return;
    }
    //console.log(datos);
    await enviandoCorreo(datos);
    reiniciarDatos();
    formulario.reset();
}

function obtenerDatos(e){
    datos[e.target.name] = e.target.value;
}

function mostrarAlerta(){
    Swal.fire({
        icon: 'error',
        title: 'Tienes que llenar los datos del formulario',
        text: 'Ocurrio un error',
    });
    /*
    if(!document.querySelector(".error")){
        const alerta = document.createElement("p");

        if(tipo === "error"){
            alerta.classList.add("error");
        }else{
            alerta.classList.add("complete");
        }

        alerta.textContent = mensaje;

        const contactanos = document.querySelector(".contactanos");

        contactanos.insertBefore(alerta, document.querySelector(".contactanos .flex-formulario"));

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }*/
}

function reiniciarDatos(){
    datos.nombre = "";
    datos.apellido = "";
    datos.telefono = "";
    datos.correo = "";
    datos.mensaje = "";
}
/*Fin validacion Formulario*/

/*Codigo menu responsive*/
function mostarMenu(){
    if(menuContent.classList.contains("active")){
        menuContent.classList.remove("active");
        iconoClose.classList.remove("active");
    }else{
        menuContent.classList.add("active");
        iconoClose.classList.add("active");
    }
}


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

/*Cambiar color del menu*/

function cambiarColor(){
    if(window.scrollY > 20){
        document.querySelector(".menu").classList.add("stycky");
    }else{
        document.querySelector(".menu").classList.remove("stycky");
    }
}


async function enviandoCorreo(datos){
    try {
        const url = `https://spyder-pc.herokuapp.com/correo`;
        const resultado =  await axios.post(url, { datos });
        Swal.fire({
            icon: 'success',
            title: 'Correo Enviado',
            text: 'Pronto nos contactaremos contigo.',
        });
    } catch (error) {
        console.log(error);
    }
}