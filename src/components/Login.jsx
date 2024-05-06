/*Login todo junto por si el otro no me funciona*/

import './login.css';

const Login = () => {
    return (
        <div className="container">
          <div className="sombra-azul"></div>
          <div className="izquierda">
            {/*<h1>ERP</h1>*/}
            <img src="prototipo_logo_cir_justo.png" alt="Imagen" />
          </div>
          <div className="derecha">
            <h1>¡BIENVENIDO!</h1>
            <h2>Accede a tu cuenta</h2>
            <form action="#" method="post">
              <input type="text" placeholder="Usuario" name="usuario" required />
              <input type="password" placeholder="Contraseña" name="contraseña" required />
              <div className="checkbox-container">
                <input type="checkbox" id="recordar" name="Recordar" value="0" />
                <label htmlFor="recordar">Recordar usuario</label>
              </div>
              <button type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      );
    }
    
    export default Login;