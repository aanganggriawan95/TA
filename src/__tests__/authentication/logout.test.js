import { handleLogout } from "@/app/lib/auth/logout"; // ganti dengan path kamu sebenarnya
import axios from "axios";
import { toast } from "react-toastify";

// Mock dependencies
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("handleLogout", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ mock sessionStorage.removeItem
    Object.defineProperty(window, "sessionStorage", {
      value: {
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it("should call /api/logout, remove token, show toast, and redirect", async () => {
    await handleLogout(mockRouter);

    expect(axios.post).toHaveBeenCalledWith("/api/logout");
    expect(sessionStorage.removeItem).toHaveBeenCalledWith("token");
    expect(toast.success).toHaveBeenCalledWith("Logout successful");
    expect(mockRouter.push).toHaveBeenCalledWith("/auth/login");
  });
});
