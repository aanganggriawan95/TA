"use client";
import LibraryVisitorsChart from "@/components/chart/areaChart";
// import ApexPieChart from "@/components/chart/pieChart";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { Progress } from "@material-tailwind/react";
import { Radio, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import dynamic from "next/dynamic";
import { TimelineWithIcon } from "@/components/pengunjungTerbaik";
import axios from "axios";

// 👇 Load komponen client-only (disable SSR)
const ApexPieChart = dynamic(() => import('@/components/chart/areaChart'), {
  ssr: false,
});


export default function AdminHomePage() {
 const [series, setSeries] = useState([]);
  const [pengunjung, setPengunjung] = useState(null);
    const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState(currentYear.toString())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token"); // atau dari cookie
        const response = await axios.get(
          `/api/dashboard?tahun=${tahun}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSeries(response.data.series);
        setPengunjung(response.data.pengunjung);
      } catch (err) {
        console.error("Gagal ambil data statistik", err);
      }
    };

    fetchData();
  }, [tahun]);
  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-6 py-4 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Dashboard Overview</h2>
        <p className="text-white">Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{pengunjung?.harian}</h2>
            <p>Activias Kunjungan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Harian
            </p>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{pengunjung?.mingguan}</h2>
            <p>Activias Kunjungan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Mingguan
            </p>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{pengunjung?.bulanan}</h2>
            <p>Activias Kunjungan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Bulanan
            </p>
          </div>
        </div>
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">{pengunjung?.tahunan}</h2>
            <p>Activias Kunjungan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Tahunan
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row w-full gap-2">

      <ApexPieChart data={series} />
      <TimelineWithIcon />
      {/* <ApexPieChart /> */}
      </div>
    </AdminLayoutWrapper>
  );
}
