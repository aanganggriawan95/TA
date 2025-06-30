"use client";
import dynamic from "next/dynamic";
// components/LibraryVisitorsChart.jsx
import React from "react";
// import Chart from "react-apexcharts";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


const LibraryVisitorsChart = ({data}) => {
  console.log("Data", data)
  const series = [
    {
      name: data[0]?.name,
      data: data[0]?.data || [],
    },
    {
       name: data[1]?.name,
      data: data[1]?.data || [],
    },
    {
       name: data[2]?.name,
      data: data[2]?.data || [],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    },
    colors: ["#008FFB", "#00E396", "#FEB019"],
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="p-4 w-full bg-white rounded shadow">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default LibraryVisitorsChart;
