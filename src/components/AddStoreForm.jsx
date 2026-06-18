import { useState } from "react";

const API = "http://192.168.1.2:3000";

export default function AddStoreForm({ onAddStore, t }) {
  const [storeName, setStoreName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    await onAddStore(storeName);
    setStoreName("");
  };

  return (
    <form className="premium-form" onSubmit={handleSubmit}>
      <input
        className="premium-input"
        type="text"
        placeholder={t.add_store_placeholder}
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />

      <button className="premium-btn" type="submit">
        {t.add_store}
      </button>
    </form>
  );
}
