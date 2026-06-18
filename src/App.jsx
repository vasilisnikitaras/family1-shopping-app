import { useEffect, useState, useCallback } from "react";
import "./index.css";
import "./App.css";

import Layout from "./components/Layout";
import Footer from "./components/Footer";
import AddItemForm from "./components/AddItemForm";
import AddStoreForm from "./components/AddStoreForm";
import Notification from "./components/Notification";
import ConfirmModal from "./components/ConfirmModal";
import ShoppingList from "./components/ShoppingList";
import StoreList from "./components/StoreList";

// Translations
import en from "./locales/en.json";
import el from "./locales/el.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import fi from "./locales/fi.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import ar from "./locales/ar.json";

const TRANSLATIONS = { en, el, de, es, fi, fr, it, ja, zh, ar };

// ===============================
// IMPORTANT: API URL FOR MOBILE
// ===============================
const API = "";

export default function App() {
  const FAMILY_ROOM = "vasilis_toni_billy_triantafilia_rose";

  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Delete modals
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [storeConfirmOpen, setStoreConfirmOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);

  const [showStores, setShowStores] = useState(false);

  // Translations
  const tBase = TRANSLATIONS[language] || TRANSLATIONS.en;
  const t = {
    ...tBase,
    empty: tBase.empty || "Your list is empty.",
    delete: tBase.delete || "Delete",
    got: tBase.got || "Got it",
    add_store: tBase.add_store || "Add Store",
    add_store_placeholder: tBase.add_store_placeholder || "New store name..."
  };

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 2500);
  };

  // ----------------------------------------------------
  // LOAD ITEMS
  // ----------------------------------------------------
  const loadItems = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/getList`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      showNotification("Failed to load items", "error");
    }
  }, []);

  // ----------------------------------------------------
  // LOAD STORES
  // ----------------------------------------------------
  const loadStores = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/getStores`);
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error("Failed to load stores:", err);
    }
  }, []);

  useEffect(() => {
    loadItems();
    loadStores();
  }, [loadItems, loadStores]);

  // ----------------------------------------------------
  // ADD ITEM
  // ----------------------------------------------------
  const handleAddItem = async ({ name, quantity, store_id }) => {
    try {
      await fetch(`${API}/api/addListItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          quantity,
          store_id,
          family_room: FAMILY_ROOM
        }),
      });

      showNotification("Item added", "success");
      loadItems();
    } catch (err) {
      console.error(err);
      showNotification("Failed to add item", "error");
    }
  };

  // ----------------------------------------------------
  // ADD STORE
  // ----------------------------------------------------
  const handleAddStore = async (storeName) => {
    try {
      await fetch(`${API}/api/addStore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: storeName }),
      });

      showNotification("Store added", "success");
      loadStores();
    } catch (err) {
      console.error(err);
      showNotification("Failed to add store", "error");
    }
  };

  // ----------------------------------------------------
  // DELETE STORE
  // ----------------------------------------------------
  const askDeleteStore = (store) => {
    setStoreToDelete(store);
    setStoreConfirmOpen(true);
  };

  const handleConfirmDeleteStore = async () => {
    try {
        await fetch(`${API}/api/deleteStores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: storeToDelete.id }),
      });

      showNotification("Store deleted", "success");
      loadStores();
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete store", "error");
    }

    setStoreConfirmOpen(false);
    setStoreToDelete(null);
  };

  // ----------------------------------------------------
  // TOGGLE BOUGHT
  // ----------------------------------------------------
  const handleToggleBought = async (item) => {
    await fetch(`${API}/api/toggleListItem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        checked: !item.is_checked
      }),
    });

    loadItems();
  };

  // ----------------------------------------------------
  // DELETE ITEM
  // ----------------------------------------------------
  const askDeleteItem = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await fetch(`${API}/api/deleteListItem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemToDelete.id }),
    });

    setConfirmOpen(false);
    setItemToDelete(null);
    loadItems();
  };

  return (
    <Layout>
      <div className="app-container premium-ui">
        <header className="header premium-header">
          <h1 className="premium-title">{t.title}</h1>

          <div className="header-controls premium-controls">
            <select
              className="premium-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.keys(TRANSLATIONS).map((lng) => (
                <option key={lng} value={lng}>
                  {lng.toUpperCase()}
                </option>
              ))}
            </select>

            <button
              className="premium-theme-btn"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </header>

        <AddStoreForm onAddStore={handleAddStore} t={t} />

        <button
          className="toggle-store-btn"
          onClick={() => setShowStores(!showStores)}
        >
          {showStores ? "Hide Stores ▲" : "Manage Stores ▼"}
        </button>

        <div className={`store-list-wrapper ${showStores ? "open" : ""}`}>
          {showStores && (
            <StoreList stores={stores} onDelete={askDeleteStore} />
          )}
        </div>

        <AddItemForm onAdd={handleAddItem} stores={stores} t={t} />

        <ShoppingList
          items={items}
          onToggleBought={handleToggleBought}
          onDelete={askDeleteItem}
          t={t}
          stores={stores}
        />

        <Footer />
      </div>

      <Notification message={notification.message} type={notification.type} />

      <ConfirmModal
        open={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <ConfirmModal
        open={storeConfirmOpen}
        onConfirm={handleConfirmDeleteStore}
        onCancel={() => setStoreConfirmOpen(false)}
        message="Are you sure you want to delete this store?"
      />
    </Layout>
  );
}
