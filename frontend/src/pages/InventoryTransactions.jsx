import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import { formatDateToYMD } from "../utils/formatDate";
import {
  getInventory
} from "../services/transactionService";



export default function InventoryTransactions() {

   const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);


const fetchInventory = async () => {
    try {
      const response = await getInventory();
      setInventory(response.data);
    } catch (error) {
      console.error("Failed to Fetch Category Data:", error);
    }
  };


  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
   
  };


 const renderColumnsWithPage = (currentPage, perPage) => {

  const columns = [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Quantity",
      selector: (row) => `${row.quantity} ${row.unit}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Purchaser",
      selector: (row) => row.username,
      sortable: true,
      width: "150px",
    },
    {
      name: "Date",
      selector: (row) => formatDateToYMD(row.created_at),
      sortable: true,
      width: "150px",
    },
  ];

  return columns;
}

  return (
    <div className="container mx-auto p-4">
      <Table
        title="Inventory Transactions Data"
        data={inventory}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />
    </div>
  );
}
