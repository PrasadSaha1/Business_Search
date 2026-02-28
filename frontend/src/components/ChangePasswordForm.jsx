import api from '../api';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function ChangePasswordForm() {
    const navigate = useNavigate();

    const handleChangePasswordSubmit = async ({ password, newPassword, confirmPassword }) => {
        try {
            console.log(password, newPassword, confirmPassword);
            const res = await api.post('https://business-search-s130.onrender.com/api/change_password/', {
                old_password: password,
                new_password: newPassword,
                confirm_password: confirmPassword,  
            });
            navigate('/settings'); // Redirect to home page after successful change
        } catch (err) {
            if (err.status === 401){  // Unauthorized from backend
                toast.error("Invalid current password");
            } else if (err.status === 409) {  // Conflict from backend
                toast.error("Passwords do not match");
            } else if (err.status === 400) {  // Bad Request from backend
                toast.error("New password must be at least 8 characters long");
            }
        }

    };

    return (
        <GeneralForm
            title="Change Password"
            showPassword={true}
            showNewPassword={true}
            showConfirmPassword={true}
            passwordDescription={"Current Password"}
            onSubmit={handleChangePasswordSubmit}
            bottomText={
                <Link className="btn btn-primary" to="/settings">Back</Link>
            }
        />
    );
}

export default ChangePasswordForm;
