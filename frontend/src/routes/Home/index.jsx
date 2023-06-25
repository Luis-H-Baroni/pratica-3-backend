import React from "react";
import LineChart from "./components/LineChart";
import { Chart } from "chart.js/auto";
import { useState, useEffect } from "react";
import io from "socket.io-client";

function Home(props) {
  const [firstRamChartData, setFirstRamChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "RAM",
      },
    ],
  });
  const [firstRomChartData, setFirstRomChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "ROM",
        data: [],
      },
    ],
  });

  const [secondRamChartData, setSecondRamChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "RAM",
      },
    ],
  });
  const [secondRomChartData, setSecondRomChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "ROM",
        data: [],
      },
    ],
  });

  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        label: "Temperature",
      },
    ],
  });
  const [humidityData, setHumidityData] = useState({
    labels: [],
    datasets: [
      {
        label: "Humidity",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const socket = io.connect("http://localhost:4000");
    socket.on("system_info_dashboard", (data) => {
      console.log("system_info_dashboard");
      console.log("info data", data);

      const newFirstRamData = { ...firstRamChartData };
      const newFirstRomData = { ...firstRomChartData };
      const newSecondRamData = { ...secondRamChartData };
      const newSecondRomData = { ...secondRomChartData };

      if (data.hostname === "DESKTOP-1") {
        newFirstRamData.labels.push(data.hostname);
        newFirstRomData.labels.push(data.hostname);

        newFirstRamData.datasets[0].data.push(data.ram);
        newFirstRomData.datasets[0].data.push(data.rom);

        if (newFirstRamData.labels.length > 5) {
          newFirstRamData.labels.shift();
          newFirstRamData.datasets[0].data.shift();
        }

        if (newFirstRomData.labels.length > 5) {
          newFirstRomData.labels.shift();
          newFirstRomData.datasets[0].data.shift();
        }

        setFirstRamChartData(newFirstRamData);
        setFirstRomChartData(newFirstRomData);
      }

      if (data.hostname === "DESKTOP-2") {
        newSecondRamData.labels.push(data.hostname);
        newSecondRomData.labels.push(data.hostname);

        newSecondRamData.datasets[0].data.push(data.ram);
        newSecondRomData.datasets[0].data.push(data.rom);

        if (newSecondRamData.labels.length > 5) {
          newSecondRamData.labels.shift();
          newSecondRamData.datasets[0].data.shift();
        }

        if (newSecondRomData.labels.length > 5) {
          newSecondRomData.labels.shift();
          newSecondRomData.datasets[0].data.shift();
        }

        setSecondRamChartData(newSecondRamData);
        setSecondRomChartData(newSecondRomData);
      }
    });
    return () => socket.off("system_info_ram");
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <h1>Dashboard</h1>
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen ">
        <div className="grid grid-cols-3 gap-2 justify-items-start">
          <div>
            <h2 style={{ textAlign: "center" }}>Workstation 1</h2>
            <LineChart chartData={firstRamChartData} />
            <LineChart chartData={firstRomChartData} />
          </div>
          <div>
            <h2 style={{ textAlign: "center" }}>Workstation 2</h2>
            <LineChart chartData={secondRamChartData} />
            <LineChart chartData={secondRomChartData} />
          </div>
          <div>
            <h2 style={{ textAlign: "center" }}>Sensor</h2>
            <LineChart chartData={temperatureData} />
            <LineChart chartData={humidityData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
