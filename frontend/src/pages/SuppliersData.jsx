import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddSupplierModal from "../components/modals/AddSupplierModal";
import { getSuppliers, saveSupplier } from "../services/suppliersService";

export default function SupplierData() {
  const [showModal, setShowModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Failed to fetch supplier data:", error);
    }
  };

  const handleSave = async (newSupplier) => {
    try {
      await saveSupplier(newSupplier);
      setShowModal(false);
      fetchSuppliers();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Supplier Successfully Saved!",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Supplier";
      Swal.fire({
        icon: "error",
        title: "Failed Save Supplier",
        text: errorMsg,
      });
      console.error(err);
    }
  };

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
      name: "Supplier Name",
      selector: (row) => row.name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      width: "585px",
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
        title="Suppliers Data"
        data={suppliers}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <AddSupplierModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
