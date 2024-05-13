import React from "react";
import Sidebar from "./components/SideBar";
import Productos from "./pages/Productos";
import Login from "./components/Login";
import OrderForm from "./components/OrderForm";
import SalesForm from "./components/SalesForm";

const App = () => {
  return (
    <>
      <Productos />
      <Sidebar />
    </>
  );
};

export default App;
