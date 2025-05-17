import axios from "axios";
import { toast } from "react-toastify";

export const handleLogout = async (router) => {
  const response = await axios.post("/api/logout");
  console.log(response);
  sessionStorage.removeItem("token");
  toast.success("Logout successful");
  router.push("/auth/login");
};
