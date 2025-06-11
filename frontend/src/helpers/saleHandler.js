import Swal from "sweetalert2";
import { saveSale } from "../services/transactionsService";

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

export const handleSave = async (e, items, setCustomerId, setStatus, setItems, id_user) => {
  e.preventDefault();
 console.log("id_user:", id_user);
  const form = e.target;
  const customer_id = form.customer_id.value;
  const statusValue = form.status.value;

  const newPurchase = {
    customer_id: parseInt(customer_id),
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
    await saveSale(newPurchase);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Successfully Sale!",
      timer: 1000,
      showConfirmButton: false,
    });

    setCustomerId("");
    setStatus("");
    setItems([{ product_id: "", quantity: "", unit_price: "", total_price: "" }]);
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to Sale";
    Swal.fire({
      icon: "error",
      title: "Failed Sale",
      text: errorMsg,
    });
    console.error(err);
  }
};
