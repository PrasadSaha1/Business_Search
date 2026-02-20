import "../styles/Home.css";
import Base from '../components/Base';
import { isAuthenticated } from '../components/checkAuth';
import { getUser } from '../components/getUser';
import { useState, useEffect, useRef } from 'react';
import BusinessDisplay from '../components/BusinessDisplay'

function AccountButtons({ isLoggedIn, name, email }) {
    if (isLoggedIn) {
        return (
            <div>
                <h2>Welcome {name}</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Create an account to get started</h3>
                <a href="/register">
                    <button className="btn btn-primary btn-lg">Create Account</button>
                </a>

                <h3 style={{ marginTop: "50px" }}>Or log into an existing account</h3>
                <a href="/login">
                    <button className="btn btn-primary btn-lg">Login</button>
                </a>
            </div>
        );
    }
}

export default function Home() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [businesses, setBusinesses] = useState([]);

    const businessTypeRef = useRef(null);
    const businessLocationRef = useRef(null);
    const numBusinessRef = useRef(null);

    useEffect(() => {
        getUser().then(user => {
            if (user) {
                setUsername(user.username);
                setEmail(user.email || "not provided");
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const businessType = businessTypeRef.current.value.trim();
        const zipcode = businessLocationRef.current.value.trim();
        const numBusinesses = numBusinessRef.current.value.trim();

        const newErrors = {};

        if (!businessType) newErrors.businessType = "Business type is required.";
        if (!zipcode) newErrors.zipcode = "Zipcode is required.";
        else if (!/^\d{5}$/.test(zipcode)) newErrors.zipcode = "Zipcode must be exactly 5 digits.";
        if (!numBusinesses) newErrors.numBusinesses = "Number of businesses is required.";
        else if (Number(numBusinesses) <= 0) newErrors.numBusinesses = "Number must be greater than 0.";
        else if (Number(numBusinesses) > 10) newErrors.numBusinesses = "Number must be no more than 10.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setBusinesses([]); 

        const params = {
            query: `${businessType} ${zipcode}`,
            limit: Number(numBusinesses),
        };
        const toQueryString = (params) => new URLSearchParams(params).toString();

        try {
            const response = await fetch(
                `https://api.openwebninja.com/local-business-data/search?${toQueryString(params)}`,
                {
                    headers: {
                        "x-api-key": "ak_vo1m23fzgwm4mesnikrk0ojzqfexv7t257j0ripmcf7a2ew",
                    },
                }
            );

            const data = await response.json();
            var formatted_data = []
            
            data.data.forEach(element => { 
                var business = {}
                business.photo_url = element.photos_sample?.[0]?.photo_url_large
                business.address = element.address;
                business.phone_number = element.phone_number;
                business.name = element.name;
                business.website = element.website;
                formatted_data.push(business)
            });

            setBusinesses(formatted_data);

        } catch (err) {
            console.error("API call failed:", err);
        }
    };


    return (
        <Base>
            <div className="d-flex flex-column align-items-center text-center py-5">
                <h1 className="mb-3">Welcome to the Website</h1>
                <h4 className="mb-5 text-muted">This is the Website Description</h4>

                <AccountButtons
                    isLoggedIn={isAuthenticated()}
                    name={username}
                    email={email}
                />

                <form className="mt-5 w-100" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                    <h3 className="mb-3">Type in the type of business</h3>

                    <div className="mb-3">
                        <input
                            ref={businessTypeRef}
                            className="form-control"
                            placeholder="Business Sector"
                        />
                        {errors.businessType && <p className="text-danger">{errors.businessType}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            ref={businessLocationRef}
                            type="text"
                            className="form-control"
                            placeholder="Zipcode"
                        />
                        {errors.zipcode && <p className="text-danger">{errors.zipcode}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            ref={numBusinessRef}
                            type="number"
                            className="form-control"
                            placeholder="Number of Businesses to Display"
                        />
                        {errors.numBusinesses && <p className="text-danger">{errors.numBusinesses}</p>}
                    </div>

                    <button className="btn btn-success btn-lg w-100" type="submit">
                        Submit
                    </button>

                </form>
            </div>
            <BusinessDisplay businesses={businesses}></BusinessDisplay>
        </Base>
    );
}
