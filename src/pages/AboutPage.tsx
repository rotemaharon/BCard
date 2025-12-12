import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>About BCard</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "20px" }}>
        Welcome to <strong>BCard</strong> - The ultimate platform for creating
        and sharing digital business cards.
      </p>

      <div style={{ textAlign: "left", marginTop: "40px", lineHeight: "1.8" }}>
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

        <h3 style={{ marginTop: "30px" }}>How to use the site</h3>
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
    </div>
  );
};

export default AboutPage;
