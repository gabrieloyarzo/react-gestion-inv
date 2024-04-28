import React, { useState } from "react";
import "./salesform.css";

function SalesForm({ closeForm, modo, productoInicial }) {
  const [producto, setProducto] = useState(productoInicial || {
    id: "",
    nombre: "",
    categoria: "",
    stock: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL = "https://gestion-inv-api.onrender.com/api/producto";
    let method = 'POST'; // Por defecto, crear un nuevo registro

    if (modo === 'modificar') {
      method = 'PUT'; // Modificar un registro existente
    }

    const response = await fetch(`${baseURL}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (response.ok) {
      alert(modo === 'modificar' ? "Producto modificado con éxito" : "Producto registrado con éxito");
      closeForm();
    } else {
      alert("Hubo un error al registrar o modificar el producto");
    }
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">{modo === 'modificar' ? 'Modificar Producto' : 'Registro de Productos'}</div>
      <form onSubmit={handleSubmit}>
        <div className="contenido">
            <div className="fila centrado">
              <div className="etiqueta">ID del producto:</div>
              <input
                type="text"
                className="input"
                name="id"
                value={producto.id}   
                onChange={handleChange}
              />
            </div>
          <div className="fila centrado">
            <div className="etiqueta">Nombre:</div>
            <input
              type="text"
              className="input"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Categoría:</div>
            <input
              type="text"
              className="input"
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Stock:</div>
            <input
              type="text"
              className="input"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Precio:</div>
            <input
              type="text"
              className="input"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
            />
          </div>
          <div className="opciones">
            <button className="cerrar-btn" onClick={closeForm}>
              Cerrar
            </button>
            <button className="guardar-btn" type="submit">
              {modo === 'modificar' ? 'Modificar' : 'Guardar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalesForm;
