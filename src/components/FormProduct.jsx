import React, { useState } from "react";
import ApiService from "../services/apiService";
import "./formproduct.css";

const FormProduct = ({ mode, closeForm, initialData, fetchData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: "",
      nombre: "",
      categoria: "",
      stock: "",
      precio: "",
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === "modificar") {
      ApiService.updateProduct(initialData.id, formData);
      fetchData();
    } else {
      ApiService.createProduct(formData);
      fetchData();
    }

    closeForm();
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">
        {mode === "modificar" ? "Modificar producto" : "Registro de Productos"}
      </div>
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
              {mode === "modificar" ? "Modificar" : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
