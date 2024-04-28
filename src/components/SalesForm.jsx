import React, { useState } from 'react';
import "./salesform.css"

function FormularioVentas({ closeForm }) {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    categoria: '',
    stock: '',
    precio: ''
  });

  const handleChange = (e) => {
    let value = e.target.name === 'stock' || e.target.name === 'id' || e.target.name === 'precio' ? parseInt(e.target.value) : e.target.value;
  
    setProducto({
      ...producto,
      [e.target.name]: value
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
    body: JSON.stringify(producto)
  });

    if (response.ok) {
      alert('Producto registrado con éxito');
      closeForm();
    } else {
      alert('Hubo un error al registrar el producto');
    }
  };

  return (
    <div style={{ zIndex: 1 }} className="formulario">
      <div className="titulo">
        <h1>REGISTRO DE PRODUCTOS</h1>
      </div>
      <div className="contenido">
        <form className="contenido-detalle" onSubmit={handleSubmit}>
          <div className="detalle">
            <label htmlFor="id-producto">ID del producto:</label>
            <input type="text" id="id-producto" name="id-producto"/><br></br>
          </div>
          <div className="detalle">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"/><br></br>
          </div>
          <div className="detalle">
            <label htmlFor="categoria">Categoria:</label>
            <input type="text" id="categoria" name="categoria"/><br></br>
          </div>
          <div className="detalle">
            <label htmlFor="stock">Stock:</label>
            <input type="text" id="stock" name="stock"/><br></br>
          </div>
          <div className="detalle">
            <label htmlFor="precio">Precio:</label>
            <input type="text" id="precio" name="precio"/><br></br>
          </div>
          <div className="opciones">
            <button onClick={closeForm}>Cancelar</button>
            <button>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioVentas;


