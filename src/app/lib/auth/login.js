import axios from "axios";
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
