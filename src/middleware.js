import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Silakan login dulu.' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/update_status/:path*',
    '/api/nota/:path*',
    '/api/input_data_pelanggan/:path*',
    '/api/input_data_barang/:path*',
    // tambahkan route API yang ingin dilindungi
  ],
};
