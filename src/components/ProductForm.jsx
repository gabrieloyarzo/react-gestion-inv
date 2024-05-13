import React, { useState } from "react";
import { capitalizeFirstLetter } from "../functions/helpers";
import "./productform.css";

const ProductForm = ({
  createTuple,
  updateTuple,
  mode,
  closeForm,
  initialData,
  fetchData,
  formFields,
}) => {
  const [formData, setFormData] = useState(initialData || {});

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
      updateTuple(initialData.id, formData);
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
          {formFields.map((field) => (
            <div className="fila centrado" key={field.name}>
              <div className="etiqueta">{capitalizeFirstLetter(field.label)}:</div>
              <input
                type={field.type}
                className="input"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
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
