import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import { formatDateToYMD } from "../utils/formatDate";
import {
  getHistorySales
} from "../services/transactionService";
import {formatRupiah} from "../utils/formatCurrency"



export default function HistorySales() {

   const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistorySales();
  }, []);


const fetchHistorySales = async () => {
    try {
      const response = await getHistorySales();
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to Fetch History Sales Data:", error);
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
      name: "Customer",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Total",
selector: (row) => formatRupiah(row.total),
      sortable: true,
      width: "150px",
    },
     {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "130px",
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
     {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning text-white"
            style={{ width: "70px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="btn btn-sm btn-danger"
            style={{ width: "70px" }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "225px",
    },
  ];

  return columns;
}

  return (
    <div className="container mx-auto p-4">
      <Table
        title="History Sales Data"
        data={history}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />
    </div>
  );
}
