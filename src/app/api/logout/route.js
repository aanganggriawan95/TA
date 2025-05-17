export async function POST(request) {
  try {
    return Response.json(
      { success: true, message: "Logout successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 }
    );
  }
}
