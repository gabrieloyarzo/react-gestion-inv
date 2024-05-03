import React from "react";
import Sidebar from "./components/SideBar"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Productos from "./pages/Productos"
import Ventas from "./pages/Ventas"

function App() {
  return (
    <>
      <Productos/>
      <Sidebar/>
    </>
  );
}

export default App;

/*
//     <Router>
//     <Sidebar />
//     <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/productos" element={<Productos />} />
//         <Route path="/ventas" element={<Ventas />} />
//     </Routes>
// </Router>
*/