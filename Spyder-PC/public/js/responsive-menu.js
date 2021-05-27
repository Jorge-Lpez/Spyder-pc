//Variables para menu responsive
const menuBtn = document.querySelectorAll(".menu-btn");
const menuContent = document.querySelector(".menu-content");
const iconoClose = document.querySelector(".menu-btn i");
  
MyApp();

function MyApp(){
    window.addEventListener("scroll", cambiarColor);
    //Evento para mostrar menu
    menuBtn.forEach(menuTodos => {
        menuTodos.addEventListener("click", mostarMenu); 
    });
}

function cambiarColor(){
    if(window.scrollY > 20){
        document.querySelector(".menu").classList.add("stycky");
    }else{
        document.querySelector(".menu").classList.remove("stycky");
    }
}

function mostarMenu(){
    if(menuContent.classList.contains("active")){
        menuContent.classList.remove("active");
        iconoClose.classList.remove("active");
    }else{
        menuContent.classList.add("active");
        iconoClose.classList.add("active");
    }
}


/* Codigo ejemplo */
const servicioContactanos = document.querySelectorAll(".servicio-contactanos");

servicioContactanos.forEach(element => {
    element.addEventListener( "click", () => {
        window.location.href = "/#contactanos";
    });
});