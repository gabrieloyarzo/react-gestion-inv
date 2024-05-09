import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../helpers";
import "./extendedtable.css";
import ProductForm from "./ProductForm";
import OrderForm from "./OrderForm";

const ExtendedTable = ({
  currentTable,
  data,
  deleteTuple,
  createTuple,
  updateTuple,
  fetchData,
}) => {
  const [columns, setColumns] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [modifyTuple, setModifyTuple] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState(false);

  const handleModifyForm = () => {
    setShowModifyForm(!showModifyForm);
  };

  const handleCreateForm = () => {
    setShowFormCreate(!showFormCreate);
  };

  const handleModify = (id) => {
    const modifyTuple = data.find((item) => item.id === id);
    if (modifyTuple) {
      setModifyTuple(modifyTuple);
      setShowModifyForm(true);
    }
  };

  const handleDelete = (id) => {
    deleteTuple(id);
  };

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
    }
  }, [data]);

  const renderForm = () => {
    switch (currentTable) {
      case "productos":
        return <ProductForm />;
      case "pedidos":
        return <OrderForm />;
      default:
        return null;
    }
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
                      <ProductForm
                        closeForm={handleModifyForm}
                        modo="modificar"
                        initialData={modifyTuple}
                        fetchData={fetchData}
                        updateTuple={updateTuple}
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
        <ProductForm
          closeForm={handleCreateForm}
          fetchData={fetchData}
          createTuple={createTuple}
        />
      )}
    </>
  );
};

export default ExtendedTable;
