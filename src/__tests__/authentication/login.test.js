import { handleLogin } from "@/app/lib/auth/login"; // Pastikan path import sesuai
import axios from "axios";
import { toast } from "react-toastify";

// Mock axios dan toast
jest.mock("axios");
jest.mock("react-toastify");

describe("handleLogin function tests", () => {
  let username;
  let password;
  let router;

  beforeEach(() => {
    username = "testuser";
    password = "password123";
    router = { push: jest.fn() }; // Mock router
  });

  it("should handle successful login", async () => {
    // Mock respons axios sukses
    axios.post.mockResolvedValueOnce({
      data: { success: true, token: "fakeToken", message: "Login successful" },
    });

    // Memanggil handleLogin langsung
    await handleLogin(
      { preventDefault: jest.fn() },
      username,
      password,
      router
    );

    // Cek apakah axios.post dipanggil dengan benar
    expect(axios.post).toHaveBeenCalledWith("/api/login", {
      user_name: username,
      password,
    });

    // Cek apakah router.push dipanggil dengan benar
    expect(router.push).toHaveBeenCalledWith("/admin");

    // Cek apakah toast.success dipanggil dengan pesan yang benar
    expect(toast.success).toHaveBeenCalledWith("Login successful");
  });

  it("should handle failed login", async () => {
    // Mock respons axios gagal
    axios.post.mockResolvedValueOnce({
      data: { success: false, message: "Invalid credentials" },
    });

    // Memanggil handleLogin langsung
    await handleLogin(
      { preventDefault: jest.fn() },
      username,
      password,
      router
    );

    // Cek apakah toast.error dipanggil dengan pesan yang benar
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });

  it("should handle API error", async () => {
    // Mock error dari axios
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    // Memanggil handleLogin langsung
    await handleLogin(
      { preventDefault: jest.fn() },
      username,
      password,
      router
    );

    // Cek apakah toast.error dipanggil dengan pesan kesalahan umum
    expect(toast.error).toHaveBeenCalledWith("Terjadi kesalahan");
  });
});
