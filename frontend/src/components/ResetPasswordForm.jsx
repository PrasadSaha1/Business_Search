import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import GeneralForm from './GeneralForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function ResetPasswordForm() {
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const handleResetPassword = async ({ newPassword, confirmPassword }) => {
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await api.post('/api/reset_password_confirm/', {
                uid,
                token,
                new_password: newPassword,
            });
            toast.success("Password reset successfully. You can now log in.");
            navigate('/login');
        } catch (err) {
            toast.error("An unknown error occured, please try again.")
        }
    };

    return (
        <GeneralForm
            mode="reset"
            title="Reset Password"
            onSubmit={handleResetPassword}
            showNewPassword={true}
            showConfirmPassword={true}
            bottomText={
                <h6>
                    Back to <Link to="/login">Login</Link>
                </h6>
            }
        />
    );
}

export default ResetPasswordForm;
