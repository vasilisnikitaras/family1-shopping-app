export default function ShoppingList({ items, onToggleBought, onDelete, t, stores }) {
  if (!items.length) {
    return (
      <p style={{ textAlign: "center", opacity: 0.6, marginTop: "20px" }}>
        {t.empty}
      </p>
    );
  }

  return (
    <ul className="shopping-list">
      {items.map((item) => {
        const storeName =
          stores?.find((s) => s.id === item.store_id)?.store_name || "";

        return (
          <li key={item.id} className="shopping-item">
            <div className="item-left">
              <button
                onClick={() => onToggleBought(item)}
                className={`got-btn ${item.is_checked ? "checked" : ""}`}
              >
                {t.got}
              </button>

              <div className="item-info">
                <span
                  className="item-name"
                  style={{
                    textDecoration: item.is_checked ? "line-through" : "none",
                    opacity: item.is_checked ? 0.6 : 1,
                  }}
                >
                  {item.name}
                </span>

                {item.quantity && (
                  <span className="item-qty">({item.quantity})</span>
                )}

                {storeName && (
                  <span className="item-store">{storeName}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDelete(item)}
              className="delete-btn"
            >
              {t.delete}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
