import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteProductModal({ product, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Product"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (product?.product_id) {
                onConfirm(product.product_id);
              } else {
                console.error("Product ID is undefined.");
              }
            }}
          >
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete product:{" "}
        <strong>{product?.name || "-"}</strong>?
      </p>
    </BaseModal>
  );
}
