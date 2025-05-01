import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { Settings } from "lucide-react";

export default function AdminHomePage() {
  return (
    <AdminLayoutWrapper>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white flex items-center gap-4 rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Settings />
          </div>

          <div>
            <h2 className="text-lg text-gray-800">6</h2>
            <p>Total Service Aktif</p>
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
            <p>Total Service Selesai</p>
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
