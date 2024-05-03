import React, { useState, useEffect } from "react";
import FormProduct from "./FormProduct";
import "./table.css";

const baseURL = "https://gestion-inv-api.onrender.com/api/producto";

function Table() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [productoModificar, setProductoModificar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleDelete = async (id) => {
    const deleteURL = `${baseURL}/${hoveredRow}`;

    const response = await fetch(deleteURL, {
      method: "DELETE",
    });

    if (response.ok) {
      alert(`Tupla con ID ${id} eliminada.`);
    } else {
      alert(`Error al eliminar tupla con ID ${id}: ${response.statusText}`);
    }
  };

  const handleModify = (id) => {
    const productoModificar = data.find((item) => item.id === id);
    if (productoModificar) {
      setProductoModificar(productoModificar);
      setShowForm(true);
    } else {
      alert("Producto no encontrado para modificar");
    }
  };

  return (
    <div className="tabla-datos">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.stock}</td>
                <td>{item.precio}</td>
                <td className="boton-celda">
                  {hoveredRow === item.id && (
                    <div className="boton-contenedor">
                      <button className="boton boton-modificar" onClick={() => handleModify(item.id)}></button>
                      <button className="boton boton-eliminar" onClick={() => handleDelete(item.id)}></button>
                    </div>
                  )}
                  {showForm && (
                    <FormProduct
                      closeForm={handleClick}
                      modo="modificar"
                      productoInicial={productoModificar}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
