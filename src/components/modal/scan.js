import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  Progress,
  Typography,
  DialogBody,
  IconButton,
  DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ScanBarcode } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export function ScanRFID({ nama, tipe, email, no_hp, alamat }) {
  const [open, setOpen] = useState(false);
  const [rfid, setRfid] = useState("");
  const inputRef = useRef(null);
  const timeoutRef = useRef(null); // <- untuk debounce
  const isSubmitting = useRef(false); // <- mencegah submit berulang
  const router = useRouter()
  const handleOpen = () => {
    setOpen(!open);
    setRfid(""); // reset input saat buka
    isSubmitting.current = false;
  };

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

  const handleChange = (e) => {
    const val = e.target.value;
    setRfid(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // debounce: tunggu 300ms setelah ketikan terakhir
    timeoutRef.current = setTimeout(() => {
      if (val.trim() !== "" && !isSubmitting.current) {
        isSubmitting.current = true; // tandai sedang submit
        handleSubmitData1(val);
      }
    }, 300);
  };

  const handleSubmitData1 = async (rfidValue) => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.post(
        "/api/tambah/pengguna",
        {
          rfid: rfidValue,
          nama,
          tipe,
          email,
          no_hp,
          alamat,
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
        setRfid(""); // reset input setelah sukses
        handleOpen();
        router.push('/admin/pengunjung')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setTimeout(() => {
        isSubmitting.current = false; // reset submit flag setelah 1 detik
      }, 1000);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="w-[200px]" variant="gradient">
        Simpan
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Upload Progress
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Silakan tap kartu RFID Anda.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>

          <div className="bg-white mt-28 border relative gap-4 rounded-lg shadow p-6">
            <div className="absolute right-4 top-4">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
            </div>

            <div className="flex relative items-center justify-center">
              <div className="w-[200px] h-[200px] relative flex items-center justify-center">
                <span className="absolute h-[120px] w-[120px] animate-ping rounded-full bg-green-500 opacity-75 z-0"></span>
                <ScanBarcode color="black" className="w-full h-full z-10" />
              </div>
            </div>

            {/* Hidden input untuk scan RFID */}
            <input
              ref={inputRef}
              value={rfid}
              onChange={handleChange}
              type="text"
              className="absolute opacity-0 pointer-events-none"
              autoFocus
            />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="w-full">
            <div className="mb-2 flex items-center justify-between gap-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-semibold"
              >
                Menunggu input...
              </Typography>
              <Typography
                variant="small"
                className="font-semibold text-gray-600"
              >
                50%
              </Typography>
            </div>
            <Progress value={50} />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
