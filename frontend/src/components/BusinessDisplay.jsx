function BusinessDisplay({ businesses }) {
  return (
    <div
      className="business-grid"
style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  columnGap: "30px", // horizontal gap between columns
  rowGap: "20px",    // vertical gap between rows
  justifyItems: "center" // center cards if a row has fewer items
}}

    >
      {businesses.map((business, index) => (
        <div
          key={index}
          className="business-card"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            width: "100%",           // take full column width
            maxWidth: "320px"        // optional: card max width
          }}
        >
          {/* Image */}
          {business.photos_sample?.[0]?.photo_url_large && (
            <img
              src={business.photos_sample[0].photo_url_large}
              alt={business.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}

          {/* Details */}
          <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>
            {business.name}
          </h3>
          <p><strong>Address:</strong> {business.address}</p>
          <p><strong>Phone:</strong> {business.phone_number}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ wordBreak: "break-word", overflowWrap: "anywhere", color: "#007bff" }}
            >
              {business.website}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}

export default BusinessDisplay;
