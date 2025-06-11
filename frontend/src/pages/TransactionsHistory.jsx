import React from "react";
import useTransactionsHistory from "../hooks/useTransactionsHistory";
import Table from "../components/common/Table";

export default function TransactionsHistory() {
  const transactionsHistory = useTransactionsHistory();

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
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
      name: "Purchaser",
      selector: (row) => row.username,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => handleEdit(row)}
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

  return (
    <div className="container mx-auto p-4">
      <Table
        title="Transactions History Data"
        data={transactionsHistory}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />
    </div>
  );
}
