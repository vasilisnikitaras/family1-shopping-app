// 5️⃣ Notification.jsx — ΤΕΛΙΚΟ

export default function Notification({ message, type }) {
  if (!message) return null;

  const bg =
    type === "error"
      ? "#c62828"
      : type === "success"
      ? "#2e7d32"
      : "#424242";

  return (
    <div style={{ ...styles.base, background: bg }}>
      {message}
    </div>
  );
}

const styles = {
  base: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 18px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 9999
  }
};
