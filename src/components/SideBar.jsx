import React from 'react';
import { NavLink } from 'react-router-dom';
import "../globals.css";
import "./sidebar.css";
import proveedores from "../images/proveedores.png";
import ventas from "../images/ventas.png";
import productos from "../images/productos.png";
import pedidos from "../images/pedidos.png";


function Sidebar() {
  return (
    <div className="container-menu">
      <div className="cont-menu">
        <nav>
          <div id="contenedor-button">
            <a id="proveedores" href="#">
              <img src={proveedores} />
              <h1>Proveedores</h1>
            </a>
            <NavLink id="ventas"  to="/ventas">
              <img src={ventas} />
              <h1>Ventas</h1>
            </NavLink>
            <NavLink id="productos" to="/productos">
              <img src={productos} />
              <h1>Productos</h1>
            </NavLink>
            <a id="pedidos" href="#">
              <img src={pedidos} />
              <h1>Pedidos</h1>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
