import mysql from "mysql2/promise";

// GANTI DENGAN createPool (cara yang benar)
const pool = mysql.createPool({
  host: "217.21.73.152",
  user: "nuja6481_presensi_sttc",
  password: "vR@5QBiWYW{*49#T",
  database: "nuja6481_presensi_sttc",
  waitForConnections: true,
  connectionLimit: 10, // Jumlah koneksi maksimum
  queueLimit: 0,
});

// Ekspor pool-nya. Kode di API route Anda tidak perlu diubah sama sekali.
export { pool as db };
