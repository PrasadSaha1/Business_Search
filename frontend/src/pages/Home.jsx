import Base from '../components/Base';
import { isAuthenticated } from '../components/checkAuth';
import { getUser } from '../components/getUser';
import { useState, useEffect } from 'react';

function AccountButtons({isLoggedIn, name, email}){
    /* If the user is logged in, the home page will welcome them, else, it will show buttons to log in or register */
    if (isLoggedIn) {
        return <div>
            <h2>Welcome {name}</h2>
        </div>
       return null;
    } else {
        return <div>
            <h3>Create an account to get started</h3>
            <a href="/register">
                <button className="btn btn-primary btn-lg">Create Account</button>
            </a>

            <h3 style={{marginTop: "50px"}}>Or log into an existing account</h3>
            <a href="/login">
                <button className="btn btn-primary btn-lg">Login</button>
            </a>
        </div>
    }
}

export default function Home() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    /* Retrieves user information to display at the top of the page, if logged in */
    useEffect(() => {
        getUser().then(user => {
            if (user) {
                setUsername(user.username);
                if (user.email) {
                    setEmail(user.email);
                } else {
                    setEmail("not provided");
                }
            } 
        });
    }, []);

  return (
    <Base>
      <div className="text-center">
        <h1>Welcome to the Website</h1>
        <h4>This is the Website Description</h4>
        <AccountButtons isLoggedIn={isAuthenticated()} name={username} email={email} />
        <h4 style={{ marginTop: '1000px' }}>Hello</h4>

      </div>
    </Base>
  );
}
