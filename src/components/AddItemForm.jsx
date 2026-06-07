import { useState } from "react";

export default function AddItemForm({ onAdd, stores, t }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [storeId, setStoreId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      quantity: quantity.trim(),
      store_id: storeId || null
    });

    setName("");
    setQuantity("");
    setStoreId("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form premium-form">
      <input
        type="text"
        placeholder={t.placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="premium-input"
      />

      <input
        type="text"
        placeholder={t.quantity}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="premium-input"
      />

      <select
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
        className="premium-select"
      >
        <option value="">{t.select_store}</option>

        {stores.map((s) => (
          <option key={s.id || s.uuid} value={s.id || s.uuid}>
            {s.store_name}
          </option>
        ))}
      </select>

      <button type="submit" className="premium-btn">
        {t.add}
      </button>
    </form>
  );
}
