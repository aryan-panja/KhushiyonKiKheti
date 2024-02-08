import React from "react";
import "../Styles/Profile.css";

const Profile = () => {
  return (
    <div id="main">
      <div id="profile">
        <div id="left">
          <div id="image_container">
            <img src="" alt="" />
          </div>
          <h2 id="name">Akshay Kumar</h2>
          <h4 id="adds">Model Town, Patiala</h4>
          <div className="menu">
            <button className="menuBtn">Basic Info</button>
            <button className="menuBtn">Order History</button>
            <button className="menuBtn">Change to Seller</button>
            <button className="menuBtn">Delete Profile</button>
          </div>
        </div>
        <div id="right">
          <div className="row">
            <div className="key">Name: </div>
            <div className="value">Akshay Kumar</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Address: </div>
            <div className="value">Model Town, Patiala</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Phone Number: </div>
            <div className="value">12345-67890</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Email ID: </div>
            <div className="value">akshay.kumar12@gmail.com</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Account Type: </div>
            <div className="value">Seller</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
