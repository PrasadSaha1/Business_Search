import Base from '../components/Base';
import { useState, useEffect } from "react";
import api from "../api"; 
import BusinessDisplay from '../components/BusinessDisplay'
import LoadingIndicator from '../components/LoadingIndicator';

function SavedBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);  // Will show loading as needed

  // Get all saved business data from the backend
  useEffect(() => {
    const getSavedBusinesses = async () => {
        setLoading(true);
        const res = await api.get("https://business-search-s130.onrender.com/api/get_saved_businesses/", {});
        setBusinesses(res.data); 
        setLoading(false);
    };
    getSavedBusinesses(); 
  }, []);

    if (loading){  // If loading, show the loading indicator
        return (
            <Base>
            <h1>Saved Businesses</h1>
            <LoadingIndicator />
            </Base>
        )
    }

return (
  <Base>
    <h1>Saved Businesses</h1>

    {/* Only show when loading is finished */}
    {!loading &&
        businesses.length > 0 ? (
        businesses.map((business) => (
            <div key={business.id} style={{ marginBottom: "20px" }}>
            <BusinessDisplay business={business} />
            </div>
        ))
        ) : (
        <p>You haven't saved any businesses yet.</p>
        )
    }
  </Base>
);

}

export default SavedBusinesses;
