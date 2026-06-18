import { useState } from "react";

const API = "http://192.168.1.2:3000";

export default function AddItemForm({ onAdd, stores, t }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [storeId, setStoreId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !storeId) return;

    await onAdd({
      name,
      quantity,
      store_id: storeId
    });

    setName("");
    setQuantity(1);
    setStoreId("");
  };

  return (
    <form className="premium-form" onSubmit={handleSubmit}>
      <input
        className="premium-input"
        type="text"
        placeholder={t.add_item_placeholder || "Add product..."}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="premium-input"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <select
        className="premium-select"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
      >
        <option value="">Select store</option>
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.store_name}
          </option>
        ))}
      </select>

      <button className="premium-btn" type="submit">
        {t.add}
      </button>
    </form>
  );
}
