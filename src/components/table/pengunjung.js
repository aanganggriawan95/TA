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
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { UpdatePengguna } from "../modal/updatePengguna";
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

const TABLE_HEAD = ["Nama", "Email", "Status", "No-hp", "Alamat", "Action"];

export function PengunjungList() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [tipe, setTipe] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  }, []);

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

  const handleNext = () => {
    if (pagination.hasNextPage) {
      fetchDataPagination(page + 1, tipe);
    }
  };

  const handlePrev = () => {
    if (pagination.hasPreviousPage) {
      fetchDataPagination(page - 1, tipe);
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
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Data Pengunjung
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button
              onClick={() => {
                router.push("/admin/pengunjung/tambah");
              }}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Tambah
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={tipe} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    setTipe(value);
                    setPage(1);
                    fetchDataPagination(1, value);
                  }}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              onChange={(e) => {
                const keyword = e.target.value;
                setSearch(keyword);
                filterLocalData(keyword, data); // filter langsung di FE
              }}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody
        className=" px-0"
        style={{
          overflow: "auto",
          scrollbarWidth: "none", // Untuk Firefox
          msOverflowStyle: "none", // Untuk IE & Edge
        }}
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
              ({ id, nama, tipe, email, no_hp, alamat }, index) => {
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
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
                      <UpdatePengguna id={id} />
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
          Page {pagination.currentPage} of {pagination.totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            disabled={!pagination.hasPreviousPage}
            onClick={handlePrev}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={!pagination.hasNextPage}
            onClick={handleNext}
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
