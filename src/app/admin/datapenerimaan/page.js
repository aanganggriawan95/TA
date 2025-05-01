"use client";
import { MembersTable } from "@/components/dataPenerimaan/table";
import AdminLayoutWrapper from "@/components/layout/adminLayout";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function PenerimaanBarang() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");

  const data = [
    {
      nama: "Ahmad",
      telepon: "08123456789",
      alamat: "Jl. Merdeka No. 10",
      jenis: "Laptop",
      merek: "Asus",
      model: "A456U",
      seri: "SN12345678",
      keluhan: "Tidak bisa menyala",
    },
    {
      nama: "Dina",
      telepon: "08129876543",
      alamat: "Jl. Sudirman No. 21",
      jenis: "Printer",
      merek: "Canon",
      model: "PIXMA MG2570S",
      seri: "SN987654321",
      keluhan: "Hasil cetak buram",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      (filterJenis === "Semua" || item.jenis === filterJenis) &&
      Object.values(item).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <AdminLayoutWrapper>
      <MembersTable />
    </AdminLayoutWrapper>
  );
}
