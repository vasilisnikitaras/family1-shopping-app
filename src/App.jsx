import { useEffect, useState, useCallback } from "react";
import "./index.css";
import "./App.css";
import { supabase } from "./supabaseClient";

import Layout from "./components/Layout";
import Footer from "./components/Footer";
import AddItemForm from "./components/AddItemForm";
import AddStoreForm from "./components/AddStoreForm";
import Notification from "./components/Notification";
import ConfirmModal from "./components/ConfirmModal";
import ShoppingList from "./components/ShoppingList";
import StoreList from "./components/StoreList";

// Translations (10 languages)
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

export default function App() {
  const FAMILY_ROOM = "vasilis_toni_billy_triantafilia_rose";

  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Item delete modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Store delete modal ⭐
  const [storeConfirmOpen, setStoreConfirmOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);

  // Debug
  console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

  // ⭐ Collapsible Stores
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

  // Load items
  const loadItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("items_v2")
      .select("*")
      .eq("family_room", FAMILY_ROOM)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      showNotification("Failed to load items", "error");
    } else {
      setItems(data || []);
    }
  }, []);

  // Load stores
  const loadStores = useCallback(async () => {
    const { data, error } = await supabase
      .from("stores_v2")
      .select("*")
      .order("store_name", { ascending: true });

    if (error) {
      console.error("Failed to load stores:", error);
    } else {
      setStores(data || []);
    }
  }, []);

  useEffect(() => {
    loadItems();
    loadStores();
  }, [loadItems, loadStores]);

  // Realtime items
  useEffect(() => {
    const channel = supabase
      .channel("items_v2_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "items_v2" },
        () => loadItems()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [loadItems]);

  // Add item
  const handleAddItem = async ({ name, quantity, store_id }) => {
    const { error } = await supabase.from("items_v2").insert([
      {
        name,
        quantity,
        store_id,
        family_room: FAMILY_ROOM,
        is_checked: false
      }
    ]);

    if (error) {
      console.error(error);
      showNotification("Failed to add item", "error");
    } else {
      showNotification("Item added", "success");
    }
  };

  // Add store
  const handleAddStore = async (storeName) => {
    const { error } = await supabase.from("stores_v2").insert([
      {
        store_name: storeName
      }
    ]);

    if (error) {
      console.error(error);
      showNotification("Failed to add store", "error");
    } else {
      showNotification("Store added", "success");
      loadStores();
    }
  };

  // ⭐ ASK delete store (opens modal)
  const askDeleteStore = (store) => {
    setStoreToDelete(store);
    setStoreConfirmOpen(true);
  };

  // ⭐ CONFIRM delete store
  const handleConfirmDeleteStore = async () => {
    const { error } = await supabase
      .from("stores_v2")
      .delete()
      .eq("id", storeToDelete.id);

    if (error) {
      console.error(error);
      showNotification("Failed to delete store", "error");
    } else {
      showNotification("Store deleted", "success");
      loadStores();
    }

    setStoreConfirmOpen(false);
    setStoreToDelete(null);
  };

  // Toggle bought
  const handleToggleBought = async (item) => {
    await supabase
      .from("items_v2")
      .update({ is_checked: !item.is_checked })
      .eq("id", item.id);
  };

  // Delete item
  const askDeleteItem = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await supabase.from("items_v2").delete().eq("id", itemToDelete.id);
    setConfirmOpen(false);
    setItemToDelete(null);
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

        {/* ADD STORE */}
        <AddStoreForm onAddStore={handleAddStore} t={t} />

        {/* ⭐ COLLAPSIBLE STORE LIST */}
        <button
          className="toggle-store-btn"
          onClick={() => setShowStores(!showStores)}
        >
          {showStores ? "Hide Stores ▲" : "Manage Stores ▼"}
        </button>

        {/* ⭐ ANIMATED STORE LIST WRAPPER */}
        <div className={`store-list-wrapper ${showStores ? "open" : ""}`}>
          {showStores && (
            <StoreList stores={stores} onDelete={askDeleteStore} />
          )}
        </div>

        {/* ADD ITEM */}
        <AddItemForm onAdd={handleAddItem} stores={stores} t={t} />

        {/* LIST */}
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

      {/* ITEM DELETE MODAL */}
      <ConfirmModal
        open={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* ⭐ STORE DELETE MODAL */}
      <ConfirmModal
        open={storeConfirmOpen}
        onConfirm={handleConfirmDeleteStore}
        onCancel={() => setStoreConfirmOpen(false)}
        message="Are you sure you want to delete this store?"
      />
    </Layout>
  );
}
