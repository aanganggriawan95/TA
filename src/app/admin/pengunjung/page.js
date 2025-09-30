"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { TablePresensi } from "@/components/table/presensi";
import { PengunjungList, PengunjungUmum } from "@/components/table/pengunjung";

const Presensi = () => {
  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-4 py-4">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Dashboard Overview
        </h2>
        <p className="text-white">Presensi Kunjungan</p>
      </div>
      <div className="mt-4">
        <PengunjungList />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
