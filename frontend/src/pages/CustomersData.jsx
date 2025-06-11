import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddCustomerModal from "../components/modals/AddCustomerModal";
import { getCustomers, saveCustomer } from "../services/customersService";

export default function ProductsData() {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomer(response.data);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
  };

  const handleSave = async (newCustomer) => {
    try {
      await saveCustomer(newCustomer);
      setShowModal(false);
      fetchCustomers();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer Successfully Saved!",
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
        title="Customers Data"
        data={customers}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <AddCustomerModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
