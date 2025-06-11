import React from "react";
import useUsers from "../hooks/useUsers";
import Table from "../components/common/Table";

export default function UsersData() {
  const users = useUsers();
  console.log(users);

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
  };

  const renderColumnsWithPage = () => [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      width: "150px",
    },
    {
      name: "Role",
      selector: (row) => row.name,
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
        title="Users Data"
        data={users}
        renderColumnsWithPage={renderColumnsWithPage}
      />
    </div>
  );
}
