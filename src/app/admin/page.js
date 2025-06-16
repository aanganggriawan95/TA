"use client";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { Progress } from "@material-tailwind/react";
import { Radio, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function AdminHomePage() {
  return (
    <AdminLayoutWrapper>
      <div className="bg-green-300 rounded-lg px-2 py-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>Dashboard</p>
      </div>

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
    </AdminLayoutWrapper>
  );
}
