import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../functions/helpers";
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
  const [formAction, setFormAction] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [primaryKey, setPrimaryKey] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      setPrimaryKey(Object.keys(data[0])[0]);
      setColumns(keys);
    }
  }, [data]);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleModify = (id) => {
    const modifyTuple = data.find((item) => item[primaryKey] === id);
    setModifyTuple(modifyTuple);
  };

  const handleDelete = (id) => {
    deleteTuple(id);
  };

  const renderForm = (formProps) => {
    switch (currentTable) {
      case "productos":
        return <ProductForm {...formProps} />;
      case "pedidos":
        return <OrderForm {...formProps} />;
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
                  onMouseEnter={() => handleMouseEnter(item[primaryKey])}
                  onMouseLeave={handleMouseLeave}
                >
                  {columns.map((column) => (
                    <td key={column}>{capitalizeFirstLetter(item[column])}</td>
                  ))}
                  <td className="boton-celda">
                    {hoveredRow === item[primaryKey] && (
                      <div className="boton-contenedor">
                        <button
                          className="boton boton-modificar"
                          onClick={() => {
                            setFormAction("modify");
                            handleModify(item[primaryKey]);
                            handleShowForm();
                          }}
                        ></button>
                        <button
                          className="boton boton-eliminar"
                          onClick={() => handleDelete(item[primaryKey])}
                        ></button>
                      </div>
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
        onClick={() => {
          setFormAction("create");
          handleShowForm();
        }}
      >
        +
      </div>
      {showForm &&
        renderForm({
          mode: formAction,
          closeForm: handleShowForm,
          initialData: modifyTuple,
          deleteTuple: deleteTuple,
          createTuple: createTuple,
          updateTuple: updateTuple,
          fetchData: fetchData,
        })}
    </>
  );
};

export default ExtendedTable;
