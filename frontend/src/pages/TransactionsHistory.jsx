import React, { useState } from "react";
import { useTransactionsHistory } from "../hooks/useTransaction";
import Table from "../components/common/Table";
import { formatDateToYMD } from "../utils/formatDate";
import DeleteHistoryTrxModal from "../components/modals/transaction/SoftDeleteHistoryTrxModal";
import { deleteTransactionsHistory } from "../services/transactionService";
import Swal from "sweetalert2";

export default function TransactionsHistory() {
  const transactionsHistory = useTransactionsHistory(); 
  const [showHistoryTrxModal, setShowHistoryTrxModal] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState(null);

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    setSelectedTrx(row);
    setShowHistoryTrxModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteTransactionsHistory(id);
      setShowHistoryTrxModal(false);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Transaction has been Deleted.",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't Delete Transaction.",
      });
    }
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

      {showHistoryTrxModal && selectedTrx && (
        <DeleteHistoryTrxModal
          historyTrx={selectedTrx}
          onClose={() => setShowHistoryTrxModal(false)}
          onConfirm={() => confirmDelete(selectedTrx.id)}
        />
      )}
    </div>
  );
}
