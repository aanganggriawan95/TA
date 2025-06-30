import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Crown } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export function TimelineWithIcon() {
  const [data, setData] = useState([])
  console.log(data)
  const simpanPenghargaan = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = axios.post(
        `/api/penghargaan`,
        { periode: 2025 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {}
  };

 const getPenghargaan = async () => {
  try {
    const token = sessionStorage.getItem("token"); // ambil token
    if (!token) throw new Error("Token tidak ditemukan");

    const response = await axios.get(`/api/penghargaan/get?tahun=${2025}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // contoh: update state atau log data
    console.log("Data penghargaan:", data);
    setData(data.top_pengunjung
)

  } catch (error) {
    console.error("Gagal mengambil penghargaan:", error);
    return null;
  }
};


  useEffect(() => {
    simpanPenghargaan();
    getPenghargaan()
  }, []);
  return (
    <div className="w-[22rem]">
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown className="h-4 w-4" color="#FFD700" />
            </TimelineIcon>
            <div>
              <Typography variant="h7" color="blue-gray">
                {data[0]?.nama}
              </Typography>
              <Typography color="gary" className="text-sm text-gray-600">
              {data[0]?.tipe } 
              </Typography>
            </div>
          </TimelineHeader>
          <TimelineBody className="pb-4">
             <Typography color="gary" className={`text-sm ${data[0]?.tipe !== "mahasiswa" ? "hidden" : ""} text-gray-600`}>
                {data[0]?.jurusan } {data[0]?.angkatan} 
            </Typography>
            <Typography color="gary" className="text-sm text-gray-600">
              Kunjungan : {data[0]?.total_kunjungan}
            </Typography>
          
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown color="#C0C0C0" className="h-4 w-4" />
            </TimelineIcon>
             <div>
              <Typography variant="h7" color="blue-gray">
                {data[1]?.nama}
              </Typography>
              <Typography color="gary" className="text-sm text-gray-600">
                {data[1]?.tipe } 
              
              </Typography>
            </div>
          </TimelineHeader>
           <TimelineBody className="pb-4">
           <Typography color="gary" className={`text-sm ${data[1]?.tipe !== "mahasiswa" ? "hidden" : ""} text-gray-600`}>
                {data[1]?.jurusan } {data[1]?.angkatan} 
            </Typography>
            <Typography color="gary" className="text-sm text-gray-600">
              Kunjungan : {data[1]?.total_kunjungan}
            </Typography>
            
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown className="h-4 w-4" color="#CD7F32" />
            </TimelineIcon>
           <div>
              <Typography variant="h7" color="blue-gray">
                {data[2]?.nama}
              </Typography>
              <Typography color="gary" className="text-sm text-gray-600">
                {data[2]?.tipe } 
             
              </Typography>
            </div>
          </TimelineHeader>
         <TimelineBody className="pb-4">
           <Typography color="gary" className={`text-sm ${data[2]?.tipe !== "mahasiswa" ? "hidden" : ""} text-gray-600`}>
                {data[2]?.jurusan } {data[2]?.angkatan} 
            </Typography>
            <Typography color="gary" className="text-sm text-gray-600">
              Kunjungan : {data[2]?.total_kunjungan}
            </Typography>
           
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
