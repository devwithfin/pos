import React, { useState, useEffect } from "react";
import Table from "../components/common/Table";
import RestoreModal from "../components/modals/archieve/RestoreModal";
import {
  getArchived,
  restoreArchivedItem,
  permanentlyDeleteItem,
} from "../services/archiveService";
import Swal from "sweetalert2";

export default function Archived() {
  const [archived, setArchived] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const mapTypeToTable = {
    category: "categories",
    product: "products",
    supplier: "suppliers",
    customer: "customers",
    role: "roles",
    user: "users",
  };

  useEffect(() => {
    fetchArchived();
  }, []);

  const fetchArchived = async () => {
    try {
      const response = await getArchived();
      setArchived(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch archive data:", error);
    }
  };

  const handleRestore = (row) => {
    const tableName = mapTypeToTable[row.type];
    if (!tableName) {
      alert(`Invalid type: ${row.type}`);
      return;
    }
    setSelectedItem({ ...row, tableName });
  };

  const handleConfirmRestore = async (item) => {
    try {
      await restoreArchivedItem(item.tableName, item.id);
      setSelectedItem(null);
      fetchArchived();
      Swal.fire({
        icon: "success",
        title: "Restored!",
        text: `${capitalize(item.tableName)} has been restored`,
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Restore failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: `Couldn't restore ${capitalize(item.tableName)}`,
      });
    }
  };

  const handlePermanentDelete = (row) => {
    const tableName = mapTypeToTable[row.type];

    Swal.fire({
      title: `Delete ${row.name}?`,
      text: "This will permanently delete the data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await permanentlyDeleteItem(tableName, row.id);
          fetchArchived();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${capitalize(row.type)} has been permanently deleted.`,
            timer: 1000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Permanent delete failed:", error);
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: `Couldn't permanently delete ${capitalize(row.type)}.`,
          });
        }
      }
    });
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Type",
      selector: (row) => capitalize(row.type),
    },
    {
      name: "Deleted At",
      selector: (row) =>
        new Date(row.deleted_at).toLocaleString("id-ID", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => handleRestore(row)}
            className="btn btn-sm btn-success"
            style={{ width: "100px" }}
          >
            Restore
          </button>
          <button
            onClick={() => handlePermanentDelete(row)}
            className="btn btn-sm btn-danger"
            style={{ width: "100px" }}
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
        key={archived.length}
        title="Archived Data"
        data={archived}
        renderColumnsWithPage={renderColumnsWithPage}
        showAddButton={false}
      />

      {selectedItem && (
        <RestoreModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirmRestore}
        />
      )}
    </div>
  );
}
