"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { Radio, Settings } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AdminHomePage() {
  const inputRef = useRef(null);

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

      try {
        const response = await fetch("/api/absensi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rfid: scannedRfid }),
        });

        const data = await response.json();
        alert(data.message || "Berhasil dikirim!");
      } catch (error) {
        alert(scannedRfid, "Gagal menyimpan data");
      }

      event.target.value = ""; // reset input
    }
  };

  return (
    <AdminLayoutWrapper>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">6</h2>
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
            <h2 className="text-lg text-gray-800">6</h2>
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
            <h2 className="text-lg text-gray-800">6</h2>
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
            <h2 className="text-lg text-gray-800">6</h2>
            <p>Activias Kunjungan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Bulanan
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-6 gap-4">
        <div className="bg-white relative col-span-3 gap-4 rounded-lg shadow p-6">
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
        <div className="bg-white col-span-6 flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">6</h2>
            <p>Total Service Selesai</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Mingguan
            </p>
          </div>
        </div>
        <div className="bg-white col-span-3 flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">6</h2>
            <p>Total Service Dibatalkan</p>
            <p className="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
              Kunjungan Bulanan
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
