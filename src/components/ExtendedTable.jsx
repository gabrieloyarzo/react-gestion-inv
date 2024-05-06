import React, { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import FormProduct from "./FormProduct";
import { capitalizeFirstLetter } from "../helpers";
import "./extendedtable.css";

const ExtendedTable = ({ data, fetchData }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [modifyProduct, setModifyProduct] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [columns, setColumns] = useState([]);
  const [showFormCreate, setShowFormCreate] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
    }
  }, [data]);

  const handleModifyForm = () => {
    setShowModifyForm(!showModifyForm);
  };

  const handleCreateForm = () => {
    setShowFormCreate(!showFormCreate);
  };

  const handleModify = (id) => {
    const modifyProduct = data.find((item) => item.id === id);
    if (modifyProduct) {
      setModifyProduct(modifyProduct);
      setShowModifyForm(true);
    } else {
      alert("Producto no encontrado para modificar");
    }
  };

  const handleDelete = async (id) => {
    ApiService.deleteProduct(id);
    fetchData();
  };

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <div className="tabla-datos">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{capitalizeFirstLetter(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {columns.map((column) => (
                    <td key={column}>{capitalizeFirstLetter(item[column])}</td>
                  ))}
                  <td className="boton-celda">
                    {hoveredRow === item.id && (
                      <div className="boton-contenedor">
                        <button
                          className="boton boton-modificar"
                          onClick={() => handleModify(item.id)}
                        ></button>
                        <button
                          className="boton boton-eliminar"
                          onClick={() => handleDelete(item.id)}
                        ></button>
                      </div>
                    )}
                    {showModifyForm && (
                      <FormProduct
                        closeForm={handleModifyForm}
                        modo="modificar"
                        initialData={modifyProduct}
                        fetchData={fetchData}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        id="boton-flotante"
        className="material-symbols-outlined"
        onClick={handleCreateForm}
      >
        +
      </div>
      {showFormCreate && (
        <FormProduct closeForm={handleCreateForm} fetchData={fetchData} />
      )}
    </>
  );
};

export default ExtendedTable;
