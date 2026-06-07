export default function Layout({ children }) {
  return (
    <div style={styles.container}>

      {/* ⭐ MOBILE TOP BAR */}
      <div className="mobile-topbar">
        <span>Family Shopping</span>
      </div>

      {/* ⭐ MAIN CONTENT */}
      <div className="mobile-content">
        <div style={styles.inner}>{children}</div>
      </div>

      {/* ⭐ MOBILE BOTTOM NAV — ΜΟΝΟ LIST */}
      <div className="mobile-nav">
        <a href="/">{/* List */}List</a>
      </div>

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    display: "flex",
    justifyContent: "center"
  },

  inner: {
    width: "100%",
    maxWidth: "480px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  }
};
