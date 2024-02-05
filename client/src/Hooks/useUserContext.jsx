import { userContext } from "../context/userContext";
import { useContext } from "react";

export default function useUserContext() {
  const context = useContext(userContext);
  if (!context)
    throw Error("Error In User Context hook , userContext doesnot exists");

  return context;
}
