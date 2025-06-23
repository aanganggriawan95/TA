import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const handleLogin = async (e, username, password, router) => {
  e.preventDefault();

  try {
    const response = await axios.post("/api/login", {
      user_name: username,
      password,
    });

    if (response.data.success) {
      router.push("/admin");
      sessionStorage.setItem("token", response.data.token);
      Cookies.set("token", response.data.token, { expires: 1 }); 
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error("Terjadi kesalahan");
    console.log(error);
  }
};
