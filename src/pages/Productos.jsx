import React, { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Table from "../components/Table";

const Productos = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productos = await ApiService.getAllProducts();
        setTableData(productos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }

    fetchData();
  }, []);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  return (
    <>
      <Banner />
      <Table data={tableData} />
      {/* <FormProduct updateData={updateTableData} /> */}
      <Button />
    </>
  );
};

export default Productos;
