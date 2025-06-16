"use client";

import axios from "axios";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Radio, ScanBarcode } from "lucide-react";

const typePengunjung = [
  {
    value: "umum",
    label: "Umum",
  },
  {
    value: "mahasiswa",
    label: "Mahasiswa",
  },
  {
    value: "dosen",
    label: "Dosen",
  },
];

const PengunjungUmumAdd = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [rfid, setRfid] = useState("");
  const [ktp, setKtp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [type, setType] = useState("");
  const [dataShow, setDataShow] = useState(false);
  const [load, setLoad] = useState(false);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   const keepFocus = () => {
  //     if (inputRef.current && document.activeElement !== inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   };
  //   const interval = setInterval(keepFocus, 100);
  //   keepFocus();
  //   return () => clearInterval(interval);
  // }, []);

  const handleSubmitData1 = async (event) => {
    setLoad(true);
    event.preventDefault();
    const scannedRfid = event.target.value.trim();

    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await axios.post(
        "/api/tambah/pengguna",
        {
          nama: nama,
          rfid: scannedRfid,
          tipe: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      sessionStorage.setItem("pengguna_id", response.data.data.id);
      if (response.data.success) {
        toast.success(response.data.message);
        sessionStorage.setItem("id_pelanggan", response.data.id_pelanggan);
        setDataShow(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };
  const handleSubmitDataPengunjung = async (e) => {
    setLoad(true);
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const pengguna_id = sessionStorage.getItem("pengguna_id");
    try {
      const response = await axios.post(
        "/api/tambah/umum",
        {
          id: pengguna_id,
          ktp: ktp,
          alamat: alamat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/admin/umum");
        }, 1200);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tambah Pengunjung Umum</h2>
        <div className="relative flex  items-center  w-full bg-gray-500/20 h-5 rounded-full">
          <div
            className="bg-blue-600 h-5 rounded-full transition-all duration-500 "
            style={{ width: dataShow ? "100%" : "50%" }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            50%
          </span>
        </div>
      </div>

      <form
        className={`${
          dataShow ? "hidden" : ""
        } bg-white mt-12 text-gray-500 rounded-lg  px-6 py-4 flex flex-col gap-6 w-full`}
      >
        {/* Data Pelanggan */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipe Pengunjung
            </label>
            <Select
              options={typePengunjung}
              onChange={(e) => setType(e.value)}
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-1">RFID</label>
            <input
              value={rfid}
              onChange={(e) => setRfid(e.target.value)}
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Masukkan nama"
              required
            />
          </div> */}
        </div>
        {/* 
        <div>
          <label className="block text-sm font-medium mb-1">Alamat</label>
          <textarea
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none resize-none h-20 focus:ring-1 focus:ring-sky-500"
            placeholder="Alamat lengkap"
            required
          ></textarea>
        </div> */}

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-sky-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {load ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              " Simpan and Next"
            )}
          </button>
        </div>
        <div className="bg-white mt-28 border relative  gap-4 rounded-lg shadow p-6">
          <div className="absolute right-4 top-4">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </div>

          <div className="flex relative items-center justify-center">
            <div className="w-[200px] h-[200px] relative flex items-center justify-center">
              <span className="absolute h-[120px] w-[120px] animate-ping rounded-full bg-green-500 opacity-75 z-0"></span>
              {/* <Radio className="w-full h-full z-10" /> */}
              <ScanBarcode color="black" className="w-full h-full z-10" />
            </div>
          </div>

          {/* Hidden input untuk scan RFID */}
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleSubmitData1}
            className="absolute opacity-0 pointer-events-none"
            autoFocus
          />
        </div>
      </form>

      <form
        onSubmit={handleSubmitDataPengunjung}
        className={` ${
          dataShow ? "" : "hidden"
        } bg-white mt-12 text-gray-500 rounded-lg  px-6 py-4 flex flex-col gap-6 w-full`}
      >
        {/* Data Barang */}
        <div className=" gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">KTP</label>
            <input
              name="ktp"
              value={ktp}
              onChange={(e) => setKtp(e.target.value)}
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="ktp"
              required
            />
          </div>
        </div>

        {/* Keluhan Barang */}
        <div>
          <label className="block text-sm font-medium mb-1">Alamat</label>
          <textarea
            name="keluhan"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none resize-none h-28 focus:ring-1 focus:ring-sky-500"
            placeholder="Tuliskan keluhan atau masalah pada barang"
            required
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-sky-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {load ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-white border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              " Simpan Barang"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default PengunjungUmumAdd;
