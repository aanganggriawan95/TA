"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";

import { useEffect, useRef, useState } from "react";

import { RekapPengunjung } from "@/components/table/rekap";

const Presensi = () => {


  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-4 py-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Dashboard Overview</h2>
        <p className="text-white">Presensi Kunjungan</p>
      </div>
      <div className="mt-4">
        <RekapPengunjung />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
