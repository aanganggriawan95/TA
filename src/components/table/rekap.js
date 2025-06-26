import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdatePengguna } from "../modal/updatePengguna";
import { CloudDownload } from "lucide-react";
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Umum",
    value: "umum",
  },
  {
    label: "Mahasiswa",
    value: "mahasiswa",
  },
  {
    label: "Staf",
    value: "staf",
  },
];

const TABLE_HEAD = [
  "Nama",
  "RFID",
  "Status",
  "Email",
  "No-hp",
  "Alamat",
  "Action",
];

export function RekapPengunjung() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [tipe, setTipe] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState(currentYear.toString());
  const tahunList = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i
  );

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get("/api/pengguna", {
        headers: {
          Authorization: `Bearer ${token}`,
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
    fetchDataPagination(page, tipe);
  }, [tahun]);

  const fetchDataPagination = async (pageNumber, tipeFilter) => {
    // setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get(`/api/rekap?tahun=${tahun}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
      console.log(response.data);
      setPagination(response.data.pagination);
      setPage(pageNumber);
      const result = response.data.data;
      filterLocalData(search, result);
    } catch (err) {
      console.error("Gagal fetch data", err);
    } finally {
      // setLoading(false);
    }
  };

  

  const filterLocalData = (keyword, rawData) => {
    const lower = keyword.toLowerCase();
    const filtered = rawData.filter(
      (item) =>
        item.nama.toLowerCase().includes(lower) ||
        item.email.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Rekap Pengunjung Perpustakaan
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
        </div>
      </CardHeader>
      <div className="p-4 grid grid-cols-3 gap-2">
        <Select
          size="md"
          label="Tahun"
          value={tahun}
          onChange={(val) => setTahun(val)}
        >
          {tahunList.map((tahunItem) => (
            <Option key={tahunItem} value={tahunItem.toString()}>
              {tahunItem}
            </Option>
          ))}
        </Select>
        <Button className="w-[50px] bg-green-600 flex justify-center"  size="sm">
          <CloudDownload />
        </Button>
      </div>
      <CardBody
        className=" px-0"
        style={{
          overflow: "auto",
          scrollbarWidth: "none", // Untuk Firefox
          msOverflowStyle: "none", // Untuk IE & Edge
        }}
      >
        <table className=" w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({ id, nama, rfid, tipe, email, no_hp, alamat }, index) => {
                const isLast = index === filteredData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={nama}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nama}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {rfid}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={tipe}
                          color={"green"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {no_hp}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {alamat}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <UpdatePengguna id={id} getData={fetchData} />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button
            
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
