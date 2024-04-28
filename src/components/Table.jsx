import React, { useState } from 'react';
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
                <td>{hoveredRow === item.id && <button>Button</button>}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
