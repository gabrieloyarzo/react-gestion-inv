import React, { useState, useEffect } from 'react';
import Banner from "../components/Banner";
import Button from "../components/Button";
import Table from "../components/Table";

const Productos = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://gestion-inv-api.onrender.com/api/producto')
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateTableData = newData => {
    setTableData(newData);
  };

  return (
    <>
      <Banner/>
      <Table data={tableData} />
      {/* <FormProduct updateData={updateTableData} /> */}
      <Button/>
    </>
  );
};

export default Productos;
