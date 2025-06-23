import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  if (!token) {
    // Jika permintaan ke route API, kirim respons JSON
    if (url.pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Silakan login dulu.' },
        { status: 401 }
      );
    }

    // Jika permintaan ke halaman (seperti /admin), redirect ke halaman login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Lindungi semua route API yang sensitif
    '/api/update_status/:path*',
    '/api/nota/:path*',
    '/api/input_data_pelanggan/:path*',
    '/api/input_data_barang/:path*',

    // Lindungi halaman admin
    '/admin/:path*',
    '/dashboard/:path*', // contoh lain jika kamu punya dashboard
  ],
};
