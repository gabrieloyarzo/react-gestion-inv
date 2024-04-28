import React, { useState } from "react";
import SalesForm from "./SalesForm"
import "./table.css";

const baseURL = "https://gestion-inv-api.onrender.com/api/producto";

const response = await fetch(`${baseURL}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

const data = await response.json();
console.log(data);

function Table() {
  const [hoveredRow, setHoveredRow] = useState(null);

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
      // La tupla ha sido eliminada correctamente
      alert(`Tupla con ID ${id} eliminada.`);
    } else {
      // Manejar errores en caso de que la eliminación falle
      alert(`Error al eliminar tupla con ID ${id}: ${response.statusText}`);
    }
  };

  const handleModify = async (id) => {

  }

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
                <td>
                  {hoveredRow === item.id && (
                    <div>
                      <button onClick={() => handleDelete(item.id)}>
                        Eliminar
                      </button>
                      <button>Modificar</button>
                    </div>
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
