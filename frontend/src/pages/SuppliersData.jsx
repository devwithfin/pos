import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddSupplierModal from "../components/modals/supplier/AddSupplierModal";
import EditSupplierModal from "../components/modals/supplier/EditSupplierModal";
import DeleteSupplierModal from "../components/modals/supplier/SoftDeleteSupplierModal";
import {
  getSuppliers,
  saveSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/supplierService";

export default function SupplierData() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Failed to Fetch Supplier Data:", error);
    }
  };

  const handleSave = async (newSupplier) => {
    try {
      await saveSupplier(newSupplier);
      setShowAddModal(false);
      fetchSuppliers();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Supplier Successfully Saved",
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

  const handleUpdate = async (updatedData) => {
    try {
      await updateSupplier(updatedData.id, {
        name: updatedData.name,
        contact: updatedData.contact,
      });
      setShowEditModal(false);
      fetchSuppliers();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Supplier Successfully Update",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to Update Supplier";
      Swal.fire({
        icon: "error",
        title: "Failed Update Supplier",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    setSelectedSupplier(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setShowDeleteModal(false);
      fetchSuppliers();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Supplier has been Deleted.",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't  Delete Supplier.",
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
            onClick={() => {
              setSelectedSupplier(row);
              setShowEditModal(true);
            }}
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
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddSupplierModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

      {showEditModal && (
        <EditSupplierModal
          supplier={selectedSupplier}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && selectedSupplier && (
        <DeleteSupplierModal
          supplier={selectedSupplier}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedSupplier.id)}
        />
      )}
    </div>
  );
}
