import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import useUserContext from "../Hooks/useUserContext";
import { reload, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { uid } = useUserContext();
  console.log(uid, " :This UID is from the userContext");
  // Here i had 2 options to either use the data of the localStorage or to use the UID from the userContext()

  const getData = async () => {
    const docRef = doc(dataBase, "Users", uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data());
    console.log(docSnap.data());
    setLoading(false);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        toast.success("LogOut Successful");
      })
      .catch((error) => {
        console.log("Failed to LogOut");
        toast.error("LogOut Failed!");
      });
    navigate(0);

    //! are these any types of security issues in this,
    //! localStorage don't seems to be that safe and reliable
  };

  useEffect(() => {
    console.log("On Profile page");
    setLoading(true);
    getData();
  }, [uid]);

  return loading ? (
    <div>Loading Animation</div>
  ) : (
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
            <div className="value">{userData.seller}</div>
            <div className="edit">
              <button className="editBtn">EDIT</button>
            </div>
          </div>
          <button onClick={logOut}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
