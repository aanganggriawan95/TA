import { useEffect, useRef } from "react";
import axios from "axios";

export default function useIdleLogout(timeout = 300000) {
  const timerRef = useRef(null);

  const logout = async () => {
    try {
      await axios.post("/api/logout");
    } catch (e) {
      console.error("Logout gagal:", e);
    }
    sessionStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Set pertama kali saat mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);
}
