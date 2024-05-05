import React, {useState, useEffect} from "react";
import FormProduct from "./FormProduct";
import { capitalizeFirstLetter } from "../helpers";
import "./table.css";

const Table = ( {data} ) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [productoModificar, setProductoModificar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
    }
  }, [data]);

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
    const deleteURL = `https://gestion-inv-api.onrender.com/api/producto/${hoveredRow}`;

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
            {columns.map(column => (
              <th key={column}>{capitalizeFirstLetter(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && 
            data.map((item, index) => (
              <tr key={index}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {columns.map(column => (
                 <td key={column}>{item[column]}</td>))}
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
