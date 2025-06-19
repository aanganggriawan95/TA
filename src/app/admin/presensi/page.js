"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { TablePresensi } from "@/components/table/presensi";

import { Progress } from "@material-tailwind/react";
import axios from "axios";
import { Radio, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Presensi = () => {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  // Jaga agar input selalu fokus
  useEffect(() => {
    const keepFocus = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };
    const interval = setInterval(keepFocus, 100);
    keepFocus();
    return () => clearInterval(interval);
  }, []);

  // Handle input RFID saat tekan Enter
  const handleScan = async (event) => {
    if (event.key === "Enter") {
      const scannedRfid = event.target.value.trim();

      setProgress(0); // reset progress ke 0

      try {
        const response = await fetch("/api/presensi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rfid: scannedRfid }),
        });

        const data = await response.json();
        console.log(data);

        // ✅ Mulai animasi progress bertahap

        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 2; // naik 2 per tick
          if (currentProgress >= 100) {
            clearInterval(interval);
            setProgress(100);
          } else {
            setProgress(currentProgress);
          }
        }, 10); // 10ms per tick, total ~500ms sampai 100

        setTimeout(() => {
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: data.message,
              draggable: true,
              timer: 1200,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: data.message,
              draggable: true,
              showConfirmButton: false,

              timer: 1200,
            });
          }
          fetchData();
        }, 1000);
        setMessage(data.message || "Berhasil dikirim!");
        setStatus(data.success ? "success" : "error");
      } catch (error) {
        setMessage(error.message || "Gagal dikirim!");
        setStatus("error");
      }

      event.target.value = ""; // reset input
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/presensi_today", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await response.data;
      if (data.success) {
        setData(data.data);
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-6 py-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Dashboard Overview</h2>
        <p className="text-white">Presensi Kunjungan</p>
      </div>
      <div className=" mt-6 flex gap-4">
        <div className="bg-white relative  gap-4 rounded-lg shadow p-6">
          <div className="absolute right-4 top-4">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </div>

          <div className="flex relative items-center justify-center">
            <div className="w-[200px] h-[200px] relative flex items-center justify-center">
              <span className="absolute h-[120px] w-[120px] animate-ping rounded-full bg-green-500 opacity-75 z-0"></span>
              <Radio className="w-full h-full z-10" />
            </div>
          </div>

          {/* Hidden input untuk scan RFID */}
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleScan}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />
        </div>
        <div className="bg-white w-full flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-full">
            <Progress
              className="transition-all duration-1000 ease-in-out"
              value={progress}
              size="lg"
              label="%"
              color="green"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <TablePresensi data={data} />
      </div>
    </AdminLayoutWrapper>
  );
};

export default Presensi;
