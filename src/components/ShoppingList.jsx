export default function ShoppingList({ items, onToggleBought, onDelete, t, stores }) {
  if (!items.length) {
    return (
      <p style={{ textAlign: "center", opacity: 0.6, marginTop: "20px" }}>
        {t.empty}
      </p>
    );
  }

  return (
    <ul style={styles.list}>
      {items.map((item) => {
        const storeName =
        stores?.find((s) => s.id === item.store_id)?.store_name || "";


        return (
          <li key={item.id} style={styles.item}>
            <div style={styles.left}>
              <button
                onClick={() => onToggleBought(item)}
                style={{
                  ...styles.gotBtn,
                  background: item.is_checked ? "#4caf50" : "#9e9e9e"
                }}
              >
                {t.got}
              </button>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    ...styles.name,
                    textDecoration: item.is_checked ? "line-through" : "none",
                    opacity: item.is_checked ? 0.7 : 1
                  }}
                >
                  {item.name}
                </span>

                {item.quantity && (
                  <span style={styles.quantity}>({item.quantity})</span>
                )}

                {storeName && (
                  <span style={styles.storeName}>{storeName}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDelete(item)}
              style={styles.deleteBtn}
            >
              {t.delete}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid var(--border)"
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  gotBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    minWidth: "80px"
  },
  name: {
    fontSize: "16px",
    fontWeight: 600,
    color: "var(--text-h)"
  },
  quantity: {
    fontSize: "14px",
    opacity: 0.9,
    color: "var(--text-h)"
  },
  storeName: {
    fontSize: "12px",
    opacity: 0.7,
    marginTop: "2px",
    color: "var(--text-h)"
  },
  deleteBtn: {
    background: "#c62828",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px"
  }
};
