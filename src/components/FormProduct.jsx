import React, { useState } from "react";
import "./formproduct.css";

const FormProduct = ({ closeForm, modo, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    id: "",
    nombre: "",
    categoria: "",
    stock: "",
    precio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let baseURL = "https://gestion-inv-api.onrender.com/api/formData";
    let method = 'POST';

    if (modo === 'modificar') {
      method = 'PUT';
      baseURL = `${baseURL}/${initialData.id}`
    }

    const response = await fetch(`${baseURL}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(modo === 'modificar' ? "Producto modificado con éxito" : "Producto registrado con éxito");
      closeForm();
    } else {
      alert("Hubo un error al registrar o modificar el formData");
    }
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">{modo === 'modificar' ? 'Modificar producto' : 'Registro de Productos'}</div>
      <form onSubmit={handleSubmit}>
        <div className="contenido">
            <div className="fila centrado">
              <div className="etiqueta">ID del producto:</div>
              <input
                type="text"
                className="input"
                name="id"
                value={formData.id}   
                onChange={handleChange}
              />
            </div>
          <div className="fila centrado">
            <div className="etiqueta">Nombre:</div>
            <input
              type="text"
              className="input"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Categoría:</div>
            <input
              type="text"
              className="input"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Stock:</div>
            <input
              type="text"
              className="input"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Precio:</div>
            <input
              type="text"
              className="input"
              name="precio"
              value={formData.precio}
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

export default FormProduct;
