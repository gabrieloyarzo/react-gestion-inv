import React, { useState } from "react";
import "./productform.css";

const ProductForm = ({
  createTuple,
  updateTuple,
  mode,
  closeForm,
  initialData,
  fetchData,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      id_producto: "",
      nombre: "",
      categoria: "",
      cantidad: "",
      min_cantidad: "",
      precio_venta: "",
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

    if (mode === "modify") {
      updateTuple(initialData.id_producto, formData);
    } else {
      createTuple(formData);
    }

    closeForm();
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">
        {mode === "modify" ? "Modificar producto" : "Registro de Productos"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="contenido">
          <div className="fila centradao">
            <div className="etiqueta">ID del producto:</div>
            <input
              type="text"
              className="input"
              name="id_producto"
              value={formData.id_producto}
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
            <div className="etiqueta">Cantidad:</div>
            <input
              type="text"
              className="input"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Min_Cantidad:</div>
            <input
              type="text"
              className="input"
              name="min_cantidad"
              value={formData.min_cantidad}
              onChange={handleChange}
            />
          </div>
          <div className="fila centrado">
            <div className="etiqueta">Precio:</div>
            <input
              type="text"
              className="input"
              name="precio_venta"
              value={formData.precio_venta}
              onChange={handleChange}
            />
          </div>
          <div className="opciones">
            <button className="cerrar-btn" onClick={closeForm}>
              Cerrar
            </button>
            <button className="guardar-btn" type="submit">
              {mode === "modify" ? "Modificar" : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
