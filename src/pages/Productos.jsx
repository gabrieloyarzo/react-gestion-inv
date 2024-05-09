import React, { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import Banner from "../components/Banner";
import ExtendedTable from "../components/ExtendedTable";

const Productos = () => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const productos = await ApiService.getAllProducts();
      setTableData(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  return (
    <>
      <Banner />
      <ExtendedTable
        currentTable="productos"
        data={tableData}
        fetchData={fetchData}
        deleteTuple={ApiService.deleteProduct}
        createTuple={ApiService.createProduct}
        updateTuple={ApiService.updateProduct}
      />
    </>
  );
};

export default Productos;
