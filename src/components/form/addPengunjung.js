"use client";

import axios from "axios";

import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Radio, ScanBarcode } from "lucide-react";
import { Select, Option } from "@material-tailwind/react";
// import dynamic
import dynamic from "next/dynamic";
import { ScanRFID } from "../modal/scan";
import { Input, Textarea } from "@material-tailwind/react";

// Nonaktifkan SSR untuk komponen select

const Pengunjung = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [rfid, setRfid] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("")
  const [no_hp, setNo_hp] = useState("")
  const [tipe, setTipe] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");
  console.log(selected);

  const [selectedTahun, setSelectedTahun] = useState("");

  // Contoh: tahun dari 2015 hingga tahun sekarang
  const currentYear = new Date().getFullYear();
  const tahunList = Array.from({ length: 5 }, (_, i) => currentYear - i);
  return (
    <>
      <div className="bg-green-300 rounded-lg px-6 py-4 mb-4">
        <h2 className="text-2xl text-white font-bold mb-4">Tambah Pengunjung Baru</h2>
        <p className="text-white">Tambahkan data</p>
      </div>

      <form
        className={` bg-white text-gray-500 rounded-lg  px-6 py-4 flex flex-col gap-6 w-full`}
      >
        {/* Data Pelanggan */}
        <div className="flex flex-col gap-6">
          <div className="w-full grid grid-cols-2 gap-4">
            <Input value={nama} onChange={(e) => setNama(e.target.value)} label="Username" />
            <Input  value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <Input  value={no_hp} onChange={(e) => setNo_hp(e.target.value)} label="No hp" />
            <Select
              label="Type"
              value={selected}
              onChange={(val) => setSelected(val)}
            >
              <Option value="umum">Umum</Option>
              <Option value="mahasiswa">Mahasiswa</Option>
              <Option value="staf">Staf Akademika</Option>
            </Select>
          </div>
<div className={`w-full grid grid-cols-3 gap-4 ${selected === "mahasiswa" ? "" : "hidden"}`}>
            <Input label="NIM" />
            <Select
              label="Prodi"
              value={selectedJurusan}
              onChange={(val) => setSelectedJurusan(val)}
            >
              <Option value="informatika">Informatika</Option>
              <Option value="industri">Industri</Option>
             
            </Select>
             <Select
        label="Tahun Angkatan"
        value={selectedTahun}
        onChange={(val) => setSelectedTahun(val)}
      >
        {tahunList.map((tahun) => (
          <Option key={tahun} value={tahun.toString()}>
            {tahun}
          </Option>
        ))}
      </Select>
          </div>


          <div className="w-full ">
            <Textarea  value={alamat} onChange={(e) => setAlamat(e.target.value)} label="Alamat" />
          </div>
        </div>

        <ScanRFID nama={nama} email={email} alamat={alamat} no_hp={no_hp} tipe={selected} />
      </form>
    </>
  );
};

export default Pengunjung;
