function LoadingIndicator() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
}

export default LoadingIndicator;
