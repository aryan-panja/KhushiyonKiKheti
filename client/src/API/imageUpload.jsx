import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadImage = (file, setImageURL) => {
  const profilePicsRef = ref(storage, `productImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapShot) => {
      const progress =
        Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      console.log(progress);
    },
    (error) => {
      console.error("Error happened: ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setImageURL(response);
        console.log(response);
      });
    }
  );
};
