"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { TablePresensi } from "@/components/table/presensi";
import { PengunjungUmum } from "@/components/table/umum";

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
      {/* <div className="bg-green-300 rounded-lg px-2 py-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>Presensi Kunjungan</p>
      </div> */}
      <div className="">
        <PengunjungUmum />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
