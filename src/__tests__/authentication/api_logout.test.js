import { POST } from "@/app/api/logout/route";

// Mock response.json
global.Response = {
  json: (data, init) => {
    return {
      ...data,
      status: init?.status || 200,
    };
  },
};

describe("POST /api/logout", () => {
  it("should return success true and message 'Logout successful'", async () => {
    const mockRequest = {}; // Tidak butuh input khusus
    const response = await POST(mockRequest);

    expect(response.success).toBe(true);
    expect(response.message).toBe("Logout successful");
    expect(response.status).toBe(200);
  });
});
