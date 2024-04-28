import React, { useState } from "react";
import "./salesform.css";

function SalesForm({ closeForm }) {
  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    categoria: "",
    stock: "",
    precio: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

/* 

      e.target.name === "stock" ||
      e.target.name === "id" ||
      e.target.name === "precio"
        ? parseInt(e.target.value)
        : 
*/

    setProducto({
      ...producto,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL = "https://gestion-inv-api.onrender.com/api/producto";

    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (response.ok) {
      alert("Producto registrado con éxito");
      closeForm();
    } else {
      alert("Hubo un error al registrar el producto");
    }
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">Registro de Productos</div>
      <form onSubmit={handleSubmit}>
        <div className="contenido">
          <div className="fila centrado">
            <div className="etiqueta">ID del producto:</div>
            <input type="text" className="input" />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Nombre:</div>
            <input type="text" className="input" />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Categoría:</div>
            <input type="text" className="input" />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Stock:</div>
            <input type="text" className="input" />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Precio:</div>
            <input type="text" className="input" />
          </div>
          <div className="opciones">
            <button className="cerrar-btn" onClick={closeForm}>
              Cerrar
            </button>
            <button className="guardar-btn" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalesForm;
