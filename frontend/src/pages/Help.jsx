import Base from "../components/Base";
import { Link } from "react-router-dom";
import "../styles/Help.css";

function Help() {
  return (
    <Base>
    <div>
        <div className="help-container">
            <h1>Help Menu</h1>
            <h2 style={{ marginTop: "50px" }}>Jump to what you need</h2>
            {/* Each of these will go down to that section */}
            <ul className="jump-links">
                <li><a href="#searching-business">Searching for a Business</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#account-system">The Account System</a></li>
            </ul>
            <p style={{ marginTop: "50px" }}>Have additional questions? View our <Link to="/FAQ">FAQ</Link> or <Link to="/contact_us">Contact Us</Link></p>

        </div>

        <div className="help-container" id="searching-business">
            <h2>Searching for a Business</h2>
            <p>To search for businesses, put the sector of the business (ie. Pizza, Retail), 
                your zip code (excluding the 4 digit extension),
                and the number of businesses to fetch (maximum of 10 per search).</p>

            <p>After a few seconds, each business will load in. 
                You can see the business’s name, address, phone number, and website. 
                If these don’t appear, that is because they were not available in the API. 
                You can also see the number of reviews that have been left, along with the average rating.</p>

            <p>Clicking the View Reviews button will allow you to see reviews of the business. 
                If you are logged in, you can save businesses, which will then be displayed on the Save Businesses page. 
                You can unsave businesses at any time. </p>
        </div>

        <div className="help-container" id="reviews">
            <h2>Reviews</h2>
            <p>On the reviews page, you will see a summary of the business along with reviews that others have given.</p>
            <p>If you are logged in, you can leave a review yourself, which includes a star rating, 
                your name (preferably your real name), and a review. </p>
            <p>Once you have left a review, you will not be able to leave another one, 
                but you may delete your current review and leave another one.</p>
        </div>

        <div className="help-container" id="account-system">
            <h2>The Account System</h2>
            <p>To create an account, scroll to the bottom of the home page and click Create Account. 
                From there, you can enter in a username (must be unique) and password (must be at least 8 characters). 
                You may leave your email, which would help you recover your account. </p>

            <p>If you have already created an account, you can log in with your username and password. 
                If you have forgotten your username or password, you may reset them using the links on the login page, 
                provided that you gave a valid email address. </p>

            <p>Once logged in, the Settings menu allows you to change your email, username, or password.</p> 
        </div>
    </div>

    </Base>
  );
}

export default Help;
