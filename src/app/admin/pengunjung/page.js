"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { TablePresensi } from "@/components/table/presensi";
import { PengunjungList, PengunjungUmum } from "@/components/table/pengunjung";

import { Progress } from "@material-tailwind/react";
import { Radio, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Presensi = () => {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-4 py-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Dashboard Overview</h2>
        <p className="text-white">Presensi Kunjungan</p>
      </div>
      <div className="mt-4">
        <PengunjungList />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
