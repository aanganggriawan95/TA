"use client"; // WAJIB untuk komponen yang akses browser API

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ⛔ Jangan impor langsung ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexPieChart = () => {
  const [state, setState] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default ApexPieChart;
