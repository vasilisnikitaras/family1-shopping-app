import { useState } from "react";

export default function AddStoreForm({ onAddStore, t }) {
  const [storeName, setStoreName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName.trim()) return;

    onAddStore(storeName.trim());
    setStoreName("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-store-form" style={styles.form}>
      <input
        type="text"
        placeholder={t.add_store_placeholder}
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.btn}>
        {t.add_store}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    marginBottom: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--bg2)",
    color: "var(--text)"
  },
  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#6a4df5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600
  }
};
