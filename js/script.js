//Variables
const btnEnviar = document.querySelector('#enviar');
const btnBorrar = document.querySelector('#resetear');

const para = document.querySelector('#para');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const errores = document.querySelector('.errores-formulario');
const formulario = document.querySelector('#enviar-email');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Funciones
eventListeners();

function eventListeners() {
    //Cuando inicia la APP
    document.addEventListener('DOMContentLoaded', iniciarWeb);

    //Los 3 inputs
    para.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Cuando se da click en resetear formulario
    btnBorrar.addEventListener('click', resetearFormulario);

    //Cuando se da click en enviar formulario
    formulario.addEventListener('submit', EnviarAccion);
}

function iniciarWeb() {
    //Para que así no se pueda seleccionar
    btnEnviar.disabled = true;
}

function validarFormulario(e) {
    //Para eliminarlo en algun momento si existe y es necesario
    const error = document.querySelector('.errores-formulario-active');

    //El target.type nos daria email, text o textarea
    switch (e.target.type) {
        case 'email':
            //Verdadero = Email valido 
            if (er.test(e.target.value)) {
                e.target.classList.add('input-true');
                e.target.classList.remove('input-error');
                if (error) error.remove();

            } else { //Falso = Email Invalido
                e.target.classList.add('input-error');
                e.target.classList.remove('input-true');
                mostrarError('Email no valido');
            }
            break;
        case 'text':
            //Verdadero = Asunto invalido, es decir, no hay nada dentro 
            if (e.target.value.length === 0) {
                e.target.classList.remove('input-true');
                e.target.classList.add('input-error');
                mostrarError('Debe ingresar un asunto');
            } else { //Falso = Asunto valido
                e.target.classList.remove('input-error');
                e.target.classList.add('input-true');
                if (error) error.remove();
            }

            break;
        case 'textarea':
            //Verdadero = Mensaje invalido, es decir, no hay nada dentro 
            if (e.target.value.length === 0) {
                e.target.classList.remove('input-true');
                e.target.classList.add('input-error');
                mostrarError('Debe ingresar un mensaje');
            } else { //Falso = Mensaje valido
                e.target.classList.remove('input-error');
                e.target.classList.add('input-true');
                if (error) error.remove();
            }
    }

    //Sale del switch y si todos los campos son validos, habilita el boton
    if (er.test(para.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.add('enviar-active');
    }
    //En el caso de que el usuario haya borrado algo de los inputs cuando el boton enviar esta habilitado, lo volvemos a inhabilitar
    else {
        btnEnviar.disabled = true;
        btnEnviar.classList.remove('enviar-active');
    }
}

//Esta función crea un mensaje si hay un error en los input
function mostrarError(mensaje) {
    const conteinerError = document.createElement('div');
    const mensajeError = document.createElement('p');

    conteinerError.classList.add('errores-formulario-active');
    mensajeError.textContent = mensaje;
    conteinerError.appendChild(mensajeError);

    //Verificar lo que hace es que solo aparezca 1 mensaje de error en pantalla
    const verificar = document.querySelectorAll('.errores-formulario-active');
    if (verificar.length === 0) {
        formulario.appendChild(conteinerError);

    } else {
        //Con este codigo cambiamos el texto existente por el nuevo 
        formulario.children[5].children[0].textContent = mensaje;
    }

}


function EnviarAccion(e) {

    e.preventDefault();


    //Mostramos el spinner en pantalla
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';

    //Despues de 3 segundos el spinner desaparece y mostramos la confirmación de que el correo fue enviado
    setTimeout(() => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado correctamente';
        parrafo.classList.add('enviar-email');
        formulario.insertBefore(parrafo, spinner);
    }, 3000);

    //Despues de 5 segundos se recarga la pagina
    setTimeout(() => {
        location.reload();
    }, 5000)
}

function resetearFormulario() {
    formulario.reset();

    if (btnEnviar.classList.contains('enviar-active')) {
        btnEnviar.classList.remove('enviar-active');
    }

    iniciarWeb();
}