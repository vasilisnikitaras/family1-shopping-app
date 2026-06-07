export default function StoreList({ stores, onDelete }) {
  return (
    <div className="store-list">
      {stores.map((store) => (
        <div key={store.id} className="store-row">
          <span className="store-name">{store.store_name}</span>

          <button
            className="delete-store-btn"
            onClick={() => onDelete(store)}
            title="Delete store"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}
