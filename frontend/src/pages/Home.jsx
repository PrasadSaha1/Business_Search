import "../styles/Home.css";
import Base from '../components/Base';
import { isAuthenticated } from '../components/checkAuth';
import { useState, useRef } from 'react';
import BusinessDisplay from '../components/BusinessDisplay'
import { Link } from "react-router-dom";
import api from '../api';

function AccountButtons({ isLoggedIn }) {
    // If not logged in show information about creating an account or logging ing
    if (!isLoggedIn) {
        return (
            <div>
                <h3>Create an account to unlock more features</h3>
                <Link to="/register">
                    <button className="btn btn-primary btn-lg">Create Account</button>
                </Link>

                <h3 style={{ marginTop: "50px" }}>Or log into an existing account</h3>
                <Link to="/login">
                    <button className="btn btn-primary btn-lg">Login</button>
                </Link>
            </div>
        );
    } else {  // If not logged in, return an empty div
        return <div></div>
    }
}

export default function Home() {
    const [errors, setErrors] = useState({});
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);

    const businessTypeRef = useRef(null);
    const businessLocationRef = useRef(null);
    const numBusinessRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();  // prevent submission in cases there are errors

        const businessType = businessTypeRef.current.value.trim();  // Gets the user inputs
        const zipcode = businessLocationRef.current.value.trim();
        const numBusinesses = numBusinessRef.current.value.trim();

        const newErrors = {};

        // Checks if the data is valid
        if (!businessType) newErrors.businessType = "Business type is required.";
        if (!zipcode) newErrors.zipcode = "Zipcode is required.";
        else if (!/^\d{5}$/.test(zipcode)) newErrors.zipcode = "Zipcode must be exactly 5 digits.";
        if (!numBusinesses) newErrors.numBusinesses = "Number of businesses is required.";
        else if (Number(numBusinesses) <= 0) newErrors.numBusinesses = "Number must be greater than 0.";
        else if (Number(numBusinesses) > 10) newErrors.numBusinesses = "Number must be no more than 10.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Gives the user errors
            return;  // Exits the function
        }

        setErrors({});  // Clear errors and businesses
        setBusinesses([]); 
        setLoading(true);

        const params = {query: `${businessType} ${zipcode}`, limit: Number(numBusinesses),};
        const toQueryString = (params) => new URLSearchParams(params).toString();  // formats the data into a string

        try {
            // calls the API
            const response = await fetch(
                `https://api.openwebninja.com/local-business-data/search?${toQueryString(params)}`,
                {
                    headers: {
                        "x-api-key": "ak_i4l83v73nz5cdg30ge9nqm85n821k16y8hpdydvse86me2o",
                    },
                }
            );

            const api_data = await response.json();
            var filtered_data = []
            var business_ids = []
            
            // takes the api data and puts it into filtered_data
            api_data.data.forEach(element => { 
                var business = {}
                business.id = element.business_id;
                business.photo_url = element.photos_sample?.[0]?.photo_url_large;
                business.address = element.address;
                business.phone_number = element.phone_number;
                business.name = element.name;
                business.website = element.website;

                business_ids.push(element.business_id)
                filtered_data.push(business)
            });

            // gets review data from LocalBizExplorer's database (not the api)
            const res = await api.post(
            'https://business-search-s130.onrender.com/api/view_business_rating/',
            { business_ids: business_ids }
            );

            const business_review_data = res.data.business_review_data;

            // for each business in filtered_data, it adds more information, and i++ moves to the next business
            var i = 0;
            filtered_data.forEach(business =>{
                business.num_reviews = business_review_data[i]["num_reviews"]
                business.average_rating_display = business_review_data[i]["average_rating_display"]
                i++
            })

            setBusinesses(filtered_data);
            setLoading(false);


        } catch (err) {
            // Catch all for errors (ie. Rate limited by API)
            console.error("API call failed:", err);
        }
    };


    return (
        <Base>
            <div className="home-container">
                <h1 className="mb-3">Welcome to LocalBizExplorer</h1>
                <h4 className=" text-muted">Find information and reviews on businesses near you!</h4>

                <form className="mt-5 w-100" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                    <h3 className="mb-3">Enter in the type of business</h3>

                    <div className="mb-3">
                        <input
                            ref={businessTypeRef}
                            className="form-control"
                            placeholder="Business Sector (ie. Library)"
                        />
                        {errors.businessType && <p className="text-danger">{errors.businessType}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            ref={businessLocationRef}
                            type="text"
                            className="form-control"
                            placeholder="Zipcode (ie. 05488)"
                        />
                        {errors.zipcode && <p className="text-danger">{errors.zipcode}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            ref={numBusinessRef}
                            type="number"
                            className="form-control"
                            placeholder="Number of Businesses to Display (max: 10)"
                        />
                        {errors.numBusinesses && <p className="text-danger">{errors.numBusinesses}</p>}
                    </div>

                    <button className="btn btn-success btn-lg w-100" type="submit">
                        Submit
                    </button>

                </form>
                {loading && <div>Loading...</div>}  
            </div>
            <div
            style={{display: "grid",rowGap: "20px"}}>
            {businesses.map((business, index) => (
            <div key={index}>
                <BusinessDisplay business={business} />
            </div>
            ))}

             <div className="home-container">
                <AccountButtons isLoggedIn={isAuthenticated()}/>
            </div>
            
            </div>
        </Base>
    );
}
