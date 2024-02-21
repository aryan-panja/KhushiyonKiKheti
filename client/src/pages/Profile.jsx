import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import useUserContext from "../Hooks/useUserContext";
import { reload, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Styles/ProfilePage.css"

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

  console.log(userData)

  return loading ? (
    <div>Loading Animation</div>
  ) : (
    <div className="profilePage-div">
      <div className="profilePage-personalInfo">
        <p className="profilePage-userName">
          {userData.name}
        </p>
        <p className="profilePage-Address">
          {userData.address}
        </p>

        <div className="profilePage-User-Info">
          <p className="profilePage-phone-no">
            Phone Number : {userData.phoneNumber}
          </p>
          <p className="profilePage-email">
            Email : {userData.email}
          </p>
          <p className="profilePage-account-type">
            Account Type : {userData.isSeller ? "Seller" : "Buyer"}
          </p>

        </div>
      </div>



      <div className="profilePage-btns">

        {!userData.isSeller && (
          <div className="profilePage-changeToSeller">
            Change To Seller
          </div>
        )}

        <div className="profilePage-logout-btn">
          Log Out
        </div>
        <div className="profilePage-order-history">
          View Order History
        </div>

        <div className="profilePage-view-sales">
          View Sales
        </div>
        <div className="profilePage-delete-account">
          Delete Account
        </div>
      </div>


    </div>
  );
};

export default Profile;
``