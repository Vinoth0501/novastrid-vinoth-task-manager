function SideBar() {
  return (
    <div className="mt-4 text-white">
      <h2>ToDO</h2>

      <p
        className="p-2 mt-4"
        style={{
          fontWeight: "600",
          letterSpacing: "1px",
          backgroundColor: "#334977",
          borderRadius: "8px",
        }}
      >
        <span className="me-2">DB</span>
        Dashboard
      </p>
    </div>
  );
}

export default SideBar;
