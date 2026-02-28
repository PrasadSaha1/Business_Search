import api from '../api';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function AddEmailForm() {
    const navigate = useNavigate();

    const handleAddEmailSubmit = async ({ email }) => {
        try {
            const res = await api.post('https://business-search-s130.onrender.com/api/add_email/', {
                email: email
            });
            navigate('/settings'); // Redirect to home page after successful change
        } catch (err) {
            if (err.status === 401){  // Error from the backend, 401 = Unauthorized
                toast.error("Invalid email address");
            } 
        }

    };

    return (
        <GeneralForm
            title="Add Email"
            showEmail={true}
            onSubmit={handleAddEmailSubmit}
            bottomText={
                <Link className="btn btn-primary" to="/settings">Back</Link>
            }
        />
    );
}

export default AddEmailForm;
