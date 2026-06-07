// 6️⃣ ConfirmModal.jsx — ΤΕΛΙΚΟ

export default function ConfirmModal({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <p style={styles.text}>Are you sure you want to delete this item?</p>

        <div style={styles.actions}>
          <button style={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.delete} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9998
  },
  box: {
    background: "var(--bg)",
    borderRadius: "12px",
    padding: "20px",
    width: "90%",
    maxWidth: "360px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
    textAlign: "center"
  },
  text: {
    marginBottom: "18px",
    color: "var(--text-h)",
    fontSize: "15px"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px"
  },
  cancel: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#555",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px"
  },
  delete: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#c62828",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px"
  }
};
