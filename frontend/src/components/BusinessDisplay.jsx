import { Link } from "react-router-dom";
import api from '../api';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { isAuthenticated } from "./checkAuth";

function saveBusiness({business, setIsSaved}) {
    const res = api.post("https://business-search-s130.onrender.com/api/save_business/",
    { business_id: business.id,
      name: business.name,
      address: business.address,
      phone_number: business.phone_number,
      website: business.website,
    });
    setIsSaved(true);  // The save button will become an unsaved button
    toast.success("Business Saved!")
}

function unsaveBusiness({business, setIsSaved}) {
    const res = api.post("https://business-search-s130.onrender.com/api/unsave_business/",
    { business_id: business.id,});
    setIsSaved(false);  // The unsave button will become a save button
    toast.success("Business Unsaved!")
}

function BusinessDisplay({ business, resetView = null }) {
  const location = useLocation().pathname;  //looks like /page_name

  const [reviewsPage_numReviews, setReviewsPage_numReviews] = useState(0);
  const [reviewsPage_averageRating, setReviewsPage_averageRating] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
        const authStatus = await isAuthenticated(); 
        setIsLoggedIn(authStatus);
    };

    const fetchAverageRating = async () => {
        setLoading(true);  // as the average rating is getting fetched, loading will be displayed
        const res = await api.post(
          `https://business-search-s130.onrender.com/api/fetch_average_rating_and_save_status/`,
          { business_id: business.id }
        );

        setReviewsPage_numReviews(res.data.num_reviews);
        setReviewsPage_averageRating(res.data.average_rating);
        setIsSaved(res.data.is_saved);
        setLoading(false);
    };

    fetchAverageRating();
    fetchAuthStatus();
  }, [business.id, resetView]);

  if (loading) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>{business.name}</h3>
      <p><strong>Address:</strong> {business.address}</p>
      <p><strong>Phone:</strong> {business.phone_number}</p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={business.website} target="_blank" rel="noopener noreferrer"
          style={{ wordBreak: "break-word", color: "#007bff" }}>
          {business.website}</a>
      </p>

      {/* If it's on the reviews page (more), show the dynamic ones, else, show the ones from the database */}
      <div>
        {location !== "/more" ? (
          <>
            <p>Number of Reviews: {business.num_reviews}</p>
            <p>Average Rating: {business.average_rating_display}</p>
          </>
        ) : (
          <>
            <p>Number of Reviews: {reviewsPage_numReviews}</p>
            <p>Average Rating: {reviewsPage_averageRating}</p>
          </>
        )}
      </div>

      {/* Only show if not on the reviews page */}
      <div>
        {location !== "/more" && (
          <Link to="/more" state={{ business }}>
            <button className="btn btn-primary btn-md me-2">View Reviews</button>
          </Link>
        )}

        {/* If saved, show unsave. If unsaved, show saved. If not logged in, prompt the user to login.*/}
        {!isLoggedIn ? (
          <div>
            <Link to="/register">Create an Account</Link> or <Link to="/login">Log In</Link> to leave a review!
          </div>
        ) : isSaved ? (
          <button
            className="btn btn-warning btn-md"
            onClick={() => unsaveBusiness({ business, setIsSaved })}
          >
            Unsave
          </button>
        ) : (
          <button
            className="btn btn-success btn-md"
            onClick={() => saveBusiness({ business, setIsSaved })}
          >
            Save
          </button>
        )}

      </div>
    </div>
  );
}

export default BusinessDisplay;
