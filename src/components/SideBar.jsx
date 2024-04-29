import "./sidebar.css";

function Sidebar() {
  return (
    <div className="container-menu">
      <div className="cont-menu">
        <nav>
          <div id="contenedor-button">
            <a id="proveedores" href="#">
              <img src="./images/proveedores.png" />
              <h1>Proveedores</h1>
            </a>
            <a id="ventas" href="#">
              <img src="./images/ventas.png" />
              <h1>Ventas</h1>
            </a>
            <a id="productos" href="#">
              <img src="./images/productos.png" />
              <h1>Productos</h1>
            </a>
            <a id="pedidos" href="#">
              <img src="./images/pedidos.png" />
              <h1>Pedidos</h1>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
