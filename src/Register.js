import React, { useState } from 'react';


function validarSoloLetras(valor) {
  if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/.test(valor)) {
    return false;
  }
  return true;
}

function validarCorreo(valor) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) {
    return false;
  }
  return true;
}

function validarSoloNumeros(valor) {
  if (!/^([0-9]{8})*$/.test(valor)) {
    return false;
  }
  return true;
}

function mostrarError(mensaje, msError) {
  msError.innerHTML = '<p>' + mensaje + '</p>';
  msError.classList.add('active');
}

function inputError(datos) {
  for (let i = 0; i < datos.length; i++) {
    datos[i].classList.add('input-error');
  }
}

function inputErrorRemove(datos) {
  for (let i = 0; i < datos.length; i++) {
    datos[i].classList.remove('input-error');
  }
}

function Register() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
   // Función para cambiar la imagen del slider automáticamente
 const changeImage = () => {
  setCurrentImage((prevImage) => (prevImage === 0 ? 1 : 0));
};
const [currentImage, setCurrentImage] = useState(0); // Estado para controlar la imagen actual

  const handleLoginClick = () => {
    setMostrarRegistro(false);
  };

  const handleRegistroClick = () => {
    setMostrarRegistro(true);
  };

  const handleTogglePassword = (inputId) => {
    const inputPass = document.getElementById(inputId);
    const icon = document.querySelector(`#${inputId} + .icono`);
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
      icon.classList.add('active');
    } else {
      inputPass.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
      icon.classList.remove('active');
    }
  };

  const handleRegisterSubmit = () => {
    // Aquí puedes realizar las validaciones y acciones necesarias para el registro
    const msError = document.querySelector('#formRegistro .error-text');
    msError.innerHTML = '';
    msError.classList.remove('active');

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correoRegistro').value.trim();
    const password = document.getElementById('passwordRegistro').value.trim();
    const cbxTerminos = document.getElementById('cbx_terminos');

    if (nombre === '' || !validarSoloLetras(nombre)) {
      mostrarError('Por favor ingrese un nombre válido, no se permiten caracteres especiales', msError);
      inputError([document.getElementById('nombre')]);
      return;
    } else {
      inputErrorRemove([document.getElementById('nombre')]);
    }

    if (correo === '' || !validarCorreo(correo)) {
      mostrarError('Por favor ingrese un correo válido', msError);
      inputError([document.getElementById('correoRegistro')]);
      return;
    } else {
      inputErrorRemove([document.getElementById('correoRegistro')]);
    }

    if (password === '' || password.length <= 4) {
      mostrarError('Contraseña débil, min. 5 caracteres', msError);
      inputError([document.getElementById('passwordRegistro')]);
      return;
    } else {
      inputErrorRemove([document.getElementById('passwordRegistro')]);
    }

    if (!cbxTerminos.checked) {
      mostrarError('Por favor aceptar Términos y condiciones', msError);
      document.querySelector('.contenedor-cbx').classList.add('cbx-error');
      return;
    } else {
      document.querySelector('.contenedor-cbx').classList.remove('cbx-error');
    }

    // Realizar aquí las acciones para el registro
    // Por ejemplo, puedes enviar los datos al servidor o realizar las acciones necesarias

    // Limpiar los campos después de un registro exitoso
    document.getElementById('nombre').value = '';
    document.getElementById('correoRegistro').value = '';
    document.getElementById('passwordRegistro').value = '';
    cbxTerminos.checked = false;
  };

  const handleLoginSubmit = () => {
    // Aquí puedes realizar las validaciones y acciones necesarias para el inicio de sesión
    const msError = document.querySelector('#formLogin .error-text');
    msError.innerHTML = '';
    msError.classList.remove('active');

    const correo = document.getElementById('correoLogin').value.trim();
    const password = document.getElementById('passwordLogin').value.trim();

    if (correo === '' || password === '') {
      mostrarError('Por favor ingrese su usuario/contraseña', msError);
      inputError([document.getElementById('correoLogin'), document.getElementById('passwordLogin')]);
      return;
    } else {
      inputErrorRemove([document.getElementById('correoLogin'), document.getElementById('passwordLogin')]);
    }

    // Realizar aquí las acciones para el inicio de sesión
    // Por ejemplo, puedes enviar los datos al servidor o realizar las acciones necesarias

    // Limpiar los campos después de un inicio de sesión exitoso
    document.getElementById('correoLogin').value = '';
    document.getElementById('passwordLogin').value = '';
  };

  return (
    <div className="contenedor-login">
      <div className="contenedor-slider">
      {/* Primer slide */}
      <div className={`slide fade ${currentImage === 0 ? 'show' : ''}`}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Foto Uleam" />
          <div className="contenido-slider">
            {/* Contenido del primer slide */}
          </div>
        </div>
        {/* Segundo slide */}
        <div className={`slide fade ${currentImage === 1 ? 'show' : ''}`}>
          <img src={process.env.PUBLIC_URL + '/logo2.jpg'} alt="Foto Uleam" />
          <div className="contenido-slider">
            {/* Contenido del segundo slide */}
          </div>
        </div>

    <a href="#" className="prev">
      <i className="fas fa-chevron-left"></i>
    </a>
    <a href="#" className="next">
      <i className="fas fa-chevron-right"></i>
    </a>
<div className="dots">
  {/* Puntos del slider */}
</div>

      </div>

      <div className="contenedor-texto">
        <div className="contenedor-form">
          <h1 className="titulo">
            ¡Bienvenido al software de recategorizaciones de docentes!
          </h1>
          <p className="descripcion">Ingresa a tu cuenta para continuar.</p>

          <ul className="tabs-links">
            <li
              className={`tab-link ${!mostrarRegistro ? 'active' : ''}`}
              onClick={handleLoginClick}
            >
              Iniciar Sesión
            </li>
            <li
              className={`tab-link ${mostrarRegistro ? 'active' : ''}`}
              onClick={handleRegistroClick}
            >
              Registrarse
            </li>
          </ul>

          <form
            action=""
            method="POST"
            id="formLogin"
            className={`formulario ${!mostrarRegistro ? 'active' : ''}`}
          >
            <div className="error-text">
              <p>Aquí se mostrarán los errores del formulario</p>
            </div>
            <input
              type="text"
              placeholder="Correo electrónico"
              className="input-text"
              id="correoLogin"
              autoComplete="off"
            />
            <div className="grupo-input">
              <input
                type="password"
                placeholder="Contraseña"
                id="passwordLogin"
                className="input-text clave"
              />
              <button
                type="button"
                className="icono fas fa-eye mostrarClave"
                onClick={() => handleTogglePassword('passwordLogin')}
              ></button>
            </div>
            <a href="#" className="link">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              className="btn"
              id="btnLogin"
              type="button"
              onClick={handleLoginSubmit}
            >
              Iniciar Sesión
            </button>
          </form>

          <form
            action=""
            method="POST"
            id="formRegistro"
            className={`formulario ${mostrarRegistro ? 'active' : ''}`}
          >
            <div className="error-text">
              <p>Aquí se mostrarán los errores del formulario</p>
            </div>
            <input
              type="text"
              placeholder="Nombre y Apellidos"
              className="input-text"
              id="nombre"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Correo electrónico"
              className="input-text"
              id="correoRegistro"
              autoComplete="off"
            />
            <div className="grupo-input">
              <input
                type="password"
                placeholder="Contraseña"
                id="passwordRegistro"
                className="input-text clave"
              />
              <button
                type="button"
                className="icono fas fa-eye mostrarClave"
                onClick={() => handleTogglePassword('passwordRegistro')}
              ></button>
            </div>
            <label className="contenedor-cbx animate">
              He leído y acepto los{' '}
              <a href="#" className="link">
                Términos y Condiciones
              </a>{' '}
              <a href="#" className="link">
                y Política de privacidad de la web
              </a>
              <input type="checkbox" name="cbx_terminos" id="cbx_terminos" />
              <span className="cbx-marca"></span>
            </label>
            <button
              className="btn"
              id="btnRegistro"
              type="button"
              onClick={handleRegisterSubmit}
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
