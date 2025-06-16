import Swal from "sweetalert2";
import { savePurchase } from "../services/transactionService";

export const handleAddItem = (items, setItems) => {
  setItems((prev) => [
    ...prev,
    { product_id: "", quantity: "", unit_price: "", total_price: "" },
  ]);
};

export const handleItemChange = (index, field, value, items, setItems, products) => {
  const newItems = [...items];
  
  if (field === "product_id") {
    newItems[index].product_id = value;
    const selectedProduct = products.find(
      (p) => p.product_id === parseInt(value)
    );
    newItems[index].unit_price = selectedProduct ? selectedProduct.price : "";
  } else if (field === "quantity") {
    newItems[index].quantity = value;
  }

  const qty = parseFloat(newItems[index].quantity) || 0;
  const price = parseFloat(newItems[index].unit_price) || 0;
  newItems[index].total_price = qty * price;

  setItems(newItems);
};

export const handleRemoveItem = (index, items, setItems) => {
  setItems((prevItems) => prevItems.filter((_, i) => i !== index));
};

export const handleSave = async (
  e,
  items,
  setStatus,
  setItems,
  setSupplierId,
  id_user
) => {
  e.preventDefault();

  const form = e.target;
  const supplier_id = form.supplier_id.value;
  const statusValue = form.status.value;

  const newPurchase = {
    supplier_id: parseInt(supplier_id),
    status: statusValue,
    created_by: parseInt(id_user),
    items: items.map((item) => ({
      product_id: parseInt(item.product_id),
      quantity: parseFloat(item.quantity),
      unit_price: parseFloat(item.unit_price),
      total_price: parseFloat(item.total_price),
    })),
  };

  try {
    await savePurchase(newPurchase);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Successfully Purchase",
      timer: 1000,
      showConfirmButton: false,
    });

    setSupplierId("");
    setStatus("");
    setItems([
      { product_id: "", quantity: "", unit_price: "", total_price: "" },
    ]);
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to Purchase";
    Swal.fire({
      icon: "error",
      title: "Failed Purchase",
      text: errorMsg,
    });
    console.error(err);
  }
};
