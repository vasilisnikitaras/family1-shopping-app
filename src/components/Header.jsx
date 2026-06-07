export default function Header({ language, onLanguageChange, theme, onToggleTheme, t }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{t.title}</h1>

      <div style={styles.controls}>
        {/* Language selector */}
        <select
          value={language}
          onChange={onLanguageChange}
          style={styles.select}
        >
          <option value="en">🇬🇧 EN</option>
          <option value="el">🇬🇷 EL</option>
        </select>

        {/* Theme toggle */}
        <button onClick={onToggleTheme} style={styles.button}>
          {theme === "light" ? t.themeDark : t.themeLight}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--text-h)"
  },

  controls: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  select: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    fontSize: "13px",
    cursor: "pointer"
  },

  button: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    fontSize: "13px",
    cursor: "pointer"
  }
};
