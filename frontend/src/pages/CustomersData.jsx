import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddCustomerModal from "../components/modals/customer/AddCustomerModal";
import EditCustomerModal from "../components/modals/customer/EditCustomerModal";
import DeleteCustomerModal from "../components/modals/customer/SoftDeleteCustomerModal";
import {
  getCustomers,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

export default function CustomerData() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomer(response.data);
    } catch (error) {
      console.error("Failed to Fetch Customer Data:", error);
    }
  };

  const handleSave = async (newCustomer) => {
    try {
      await saveCustomer(newCustomer);
      setShowAddModal(false);
      fetchCustomers();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer Successfully Saved",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Customer";
      Swal.fire({
        icon: "error",
        title: "Failed Save Customer",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateCustomer(updatedData.id, {
        name: updatedData.name,
        contact: updatedData.contact,
      });
      setShowEditModal(false);
      fetchCustomers();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer Successfully Update",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to Update Customer";
      Swal.fire({
        icon: "error",
        title: "Failed Update Customer",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    setSelectedCustomer(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setShowDeleteModal(false);
      fetchCustomers();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Customer has been deleted",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't Delete Customer",
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
      name: "Customer Name",
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
              setSelectedCustomer(row);
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
        title="Customers Data"
        data={customers}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

      {showEditModal && (
        <EditCustomerModal
          customer={selectedCustomer}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && selectedCustomer && (
        <DeleteCustomerModal
          customer={selectedCustomer}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedCustomer.id)}
        />
      )}
    </div>
  );
}
