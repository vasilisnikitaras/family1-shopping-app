export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} VNF Software — Created by Vasilis Fanes Nikitaras. All Rights Reserved.
      </p>

      <p style={styles.textSmall}>
        Unauthorized copying or resale is strictly prohibited and punishable by law.
      </p>

      <p style={styles.textSmall}>
        Contact: vasilis.nikitaras@gmail.com
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "20px 0",
    textAlign: "center",
    opacity: 0.85
  },

  text: {
    fontSize: "13px",
    color: "var(--text)",
    fontWeight: 600
  },

  textSmall: {
    fontSize: "11px",
    color: "var(--text)",
    opacity: 0.7,
    marginTop: "4px"
  }
};
