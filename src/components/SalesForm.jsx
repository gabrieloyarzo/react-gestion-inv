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
    let value =
      e.target.name === "stock" ||
      e.target.name === "id" ||
      e.target.name === "precio"
        ? parseInt(e.target.value)
        : e.target.value;

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
      <div class="titulo">Registro de Productos</div>
      <form onSubmit={handleSubmit}>
        <div class="contenido">
          <div class="fila centrado">
            <div class="etiqueta">ID del producto:</div>
            <input type="text" class="input" />
          </div>
          <div class="fila centrado">
            <div class="etiqueta">Nombre:</div>
            <input type="text" class="input" />
          </div>
          <div class="fila centrado">
            <div class="etiqueta">Categoría:</div>
            <input type="text" class="input" />
          </div>
          <div class="fila centrado">
            <div class="etiqueta">Stock:</div>
            <input type="text" class="input" />
          </div>
          <div class="fila centrado">
            <div class="etiqueta">Precio:</div>
            <input type="text" class="input" />
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <button class="cerrar-btn" onclick={closeForm}>
              Cerrar
            </button>
            <button class="guardar-btn" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalesForm;
