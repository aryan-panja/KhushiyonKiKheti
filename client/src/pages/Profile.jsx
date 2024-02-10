import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";

const Profile = () => {
  const [userData, setUser] = useState({});

  const getData = async () => {
    const uid = JSON.parse(localStorage.getItem("USER")).uid;
    const docRef = doc(dataBase, "Users", uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data());
    console.log(docSnap.data());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="main">
      <div id="profile">
        <div id="left">
          <div id="image_container">
            <img src="" alt="" />
          </div>
          <h2 id="name">{userData.name}</h2>
          <h4 id="adds">{userData.address}</h4>
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
            <div className="value">{userData.name}</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Address: </div>
            <div className="value">{userData.address}</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Phone Number: </div>
            <div className="value">{userData.phoneNumber}</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <div className="row">
            <div className="key">Email ID: </div>
            <div className="value">{userData.email}</div>
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
