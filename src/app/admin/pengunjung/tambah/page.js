"use client";
import Pengunjung from "@/components/form/addPengunjung";
import AdminLayoutWrapper from "@/components/layout/adminLayout";

const TambahPengunjung = () => {
  return (
    <AdminLayoutWrapper>
      {/* <div className="bg-green-300 rounded-lg px-2 py-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>TambahPengunjung Kunjungan</p>
      </div> */}
      <div className="">
        <Pengunjung />
      </div>
    </AdminLayoutWrapper>
  );
};

export default TambahPengunjung;
