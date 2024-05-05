import React, { useState } from "react";
import "./button.css";
import FormProduct from "./FormProduct";

const Button = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div id="boton-flotante" className="material-symbols-outlined" onClick={handleClick}>
        +
      </div>
      {showForm && <FormProduct closeForm={handleClick}/>}
    </>
  );
}

export default Button;
