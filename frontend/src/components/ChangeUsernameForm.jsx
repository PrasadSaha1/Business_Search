import api from '../api';
import { useNavigate } from 'react-router-dom';
import GeneralForm from './GeneralForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangeUsernameForm() {
    const navigate = useNavigate();

    const handleChangeUsernameSubmit = async ({ username, password }) => {
        try {
            const res = await api.post('http://localhost:8000/api/change_username/', {
                username: username,
                password: password,
            });
            navigate('/settings'); // Redirect to home page after successful change
        } catch (err) {
            if (err.status === 401){
                toast.error("Invalid password");
            } else if (err.status === 409) {
                toast.error("Username already taken");
            }
        }

    };

    return (
        <GeneralForm
            title="Change Username"
            showUsername={true}
            showPassword={true}
            usernameDescription={"New Username"}
            onSubmit={handleChangeUsernameSubmit}
            bottomText={
                <a className="btn btn-primary" href="/settings">Back</a>
            }
        />
    );
}

export default ChangeUsernameForm;
