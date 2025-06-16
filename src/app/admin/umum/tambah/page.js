"use client";
import PengunjungUmumAdd from "@/components/form/pengunjungUmum";
import AdminLayoutWrapper from "@/components/layout/adminLayout";

const Presensi = () => {
  return (
    <AdminLayoutWrapper>
      {/* <div className="bg-green-300 rounded-lg px-2 py-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>Presensi Kunjungan</p>
      </div> */}
      <div className="mt-10">
        <PengunjungUmumAdd />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
