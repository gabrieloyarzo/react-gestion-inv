import React, { useState } from "react";
import "./button.css";
import SalesForm from "./SalesForm";

function Button() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div id="boton-flotante" className="material-symbols-outlined" onClick={handleClick}>
        +
      </div>
      {showForm && <SalesForm closeForm={handleClick}/>}
    </>
  );
}

export default Button;
