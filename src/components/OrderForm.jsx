import React, { useState } from "react";
import "./formpedido.css";

const FormPedido = ({
  createTuple,
  updateTuple,
  mode,
  closeForm,
  initialData,
  fetchData,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      id_pedido: "",
      rut_proveedor: "",
      rut_usuario: "",
      fecha: "",
      compra_total: "",
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
      updateTuple(initialData.id, formData);
      fetchData();
    } else {
      createTuple(formData);
      fetchData();
    }

    closeForm();
  };

  return (
    <div style={{ zIndex: 1 }} id="ventana_flotante">
      <div className="titulo">
        {mode === "modificar" ? "Modificar Pedido" : "Registro de Pedido"}
      </div>
      <div className="contenido">
        <div className="fila centrado">
          <div className="etiqueta">RUT de la Empresa:</div>
          <input type="text" className="input" value="20.655.222-2" />
        </div>
        <div className="fila centrado">
          <div className="etiqueta">Área del pedido:</div>
        </div>
        <div className="fila">
          <div className="titulo_producto">ID del Producto</div>
          <div className="titulo_cantidad">Cantidad</div>
          <div className="titulo_total">Total</div>
        </div>
        <div className="fila">
          <input type="text" className="input_producto" value="Nombre" />
          <div className="cantidad">
            <input type="number" className="input_cantidad" value="1" />
            <span className="unidad">x 1000</span>
          </div>
          <div className="total">$5.000</div>
        </div>
        <div className="fila">
          <div className="botones">
            <button className="boton-anadir">Añadir</button>
            <button className="boton-cancelar">Cancelar</button>
          </div>
        </div>
        <div className="fila">
          <div className="total">Total</div>
          <div className="total">$15.000</div>
        </div>
      </div>
      <div className="boton-opciones">
        <button className="cerrar-btn" onclick="cerrarVentana()">
          Cerrar
        </button>
        <button className="guardar-btn">Guardar</button>
      </div>
    </div>
  );
};

export default FormPedido;
