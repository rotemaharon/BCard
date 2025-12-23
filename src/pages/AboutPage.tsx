import React from "react";
import "../css/ContentPages.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About BCard</h1>
      <p className="about-intro">
        Welcome to <strong>BCard</strong> - The ultimate platform for creating
        and sharing digital business cards.
      </p>

      <div className="about-content-area">
        <h3>What can you do here?</h3>
        <ul>
          <li>
            <strong>Discover:</strong> Browse through a vast collection of
            business cards.
          </li>
          <li>
            <strong>Create:</strong> As a business user, you can easily create
            and manage your own cards.
          </li>
          <li>
            <strong>Save:</strong> Like cards to save them to your Favorites.
          </li>
        </ul>

        <h3 className="about-section-title">How to use the site</h3>
        <p>
          Register for free to start saving your favorite cards.
          <br />
          Want to publish your own card? Make sure to sign up as a{" "}
          <strong>"Business"</strong> user!
          <br />
          Then, navigate to the "My Cards" page to add your business details and
          location.
        </p>
      </div>
      <p className="about-footer">
        Developed by <strong>Rotem Aharon</strong>
      </p>
    </div>
  );
};

export default AboutPage;
