import React from "react";
import Sidebar from "./components/SideBar"
import Productos from "./pages/Productos"

const App = () => {
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