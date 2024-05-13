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
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      const fields = keys.map((key) => ({ name: key, label: capitalizeFirstLetter(key), type: 'text' }));
      setColumns(keys);
      setFormFields(fields);
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
    const modifyTuple = data.find((item) => item.id === id);
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
                          onClick={() => {
                            setFormAction("modify");
                            handleModify(item.id);
                            handleShowForm();
                          }}
                        ></button>
                        <button
                          className="boton boton-eliminar"
                          onClick={() => handleDelete(item.id)}
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
          formFields: formFields,
        })}
    </>
  );
};

export default ExtendedTable;
