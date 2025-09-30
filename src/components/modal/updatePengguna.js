import React, { useEffect, useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export function UpdatePengguna({ id }) {
  console.log(id);
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [selected, setSelected] = useState("");
  const [jk, setJk] = useState("");
  console.log(jk);
  const [selectedJurusan, setSelectedJurusan] = useState("");
  console.log(selected);

  const [selectedTahun, setSelectedTahun] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);

  const currentYear = new Date().getFullYear();
  const tahunList = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const handleOpen = () => setOpen(!open);

  const fetchDataPagination = async (pageNumber, tipeFilter) => {
    // setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        `/api/pengguna/pagination?page=${pageNumber}&tipe=${tipeFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Gagal fetch data", err);
    } finally {
      // setLoading(false);
    }
  };

  const getById = async (id) => {
    console.log("id yg di get", id);
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(`/api/pengguna/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data[0];
      console.log("Data", data);

      if (data) {
        setNama(data.nama);
        setEmail(data.email);
        setNo_hp(data.no_hp);
        setSelected(data.tipe);
        setJk(data.jenis_kelamin);
        setSelectedJurusan(data.jurusan);
        setSelectedTahun(data.angkatan.toString());
        setNim(data.nim);
        setAlamat(data.alamat);
      }

      console.log("Data by id", data);
    } catch (error) {
      console.log("Gagal ambil data by ID", error);
    }
  };

  useEffect(() => {
    if (open && id) {
      getById(id);
    }
  }, [open, id]);
  const handleUpdate = async (id) => {
    const token = sessionStorage.getItem("token");
    console.log(token);

    try {
      const response = await axios.put(
        `/api/pengguna/update`,
        {
          id: id,
          nama: nama,
          tipe: selected,
          email: email,
          no_hp: no_hp,
          alamat: alamat,
          nim: nim,
          jurusan: selectedJurusan,
          angkatan: selectedTahun,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      toast.success(response.data.message);
      handleOpen();
      fetchDataPagination(1, "");
    } catch (error) {
      console.log("Update gagal:", error.response?.data || error.message);
      toast.error("Gagal update data");
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.delete("/api/pengguna/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id }, // id akan dikirim sebagai query string
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        handleOpen();
      } else {
        toast.error(data.message || "Gagal menghapus data");
      }
    } catch (error) {
      console.error("Gagal menghapus:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat menghapus"
      );
    }
  };

  return (
    <>
      <Tooltip content="Edit User">
        <IconButton
          onClick={() => {
            handleOpen();
            getById(id);
          }}
          variant="text"
        >
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage Item
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <div className="flex flex-col gap-6">
            <div className="w-full grid grid-cols-1 gap-4">
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                label="Username"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              <Input
                value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
                label="No hp"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <Select
                label="Type"
                value={selected}
                onChange={(val) => setSelected(val)}
              >
                <Option value="umum">Umum</Option>
                <Option value="mahasiswa">Mahasiswa</Option>
                <Option value="staf">Staf Akademika</Option>
              </Select>
              <Select
                label="Jenis Kelamin"
                value={jk}
                onChange={(val) => setJk(val)}
              >
                <Option value="laki-laki">Laki-laki</Option>
                <Option value="perempuan">Perempuan</Option>
              </Select>
            </div>
            <div
              className={`w-full grid grid-cols-2 gap-4 ${selected === "mahasiswa" ? "" : "hidden"}`}
            >
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

            <div className="w-full flex flex-col gap-4 ">
              <div className={`${selected === "mahasiswa" ? "" : "hidden"}`}>
                <Input
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  label="NIM"
                />
              </div>
              <Textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                label="Alamat"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            className="mr-4 bg-green-500"
            onClick={() => {
              handleUpdate(id);
            }}
          >
            Update
          </Button>
          <Button className="bg-red-600" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
