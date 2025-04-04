import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { Header, MonthSelector, Lanes, DaysHeader } from "./components";
import timelineItems from "./timelineItems.js";
import { assignLanes, getMonths } from "./assignLanes.js";

function App() {
  const months = getMonths(timelineItems);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [lanes, setLanes] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const monthData = months[selectedMonthIndex || 0];
    if ( !monthData) return;

    const {month, year} = monthData;

    const updateLanes = () => {
      setLanes(assignLanes(timelineItems, month, year));
    }

    const updateDays = () => {
      setDays(Array.from({ length: new Date(year, month + 1, 0).getDate() }).map((_, index) => index ));
    }

    updateLanes();
    updateDays();
  }, [selectedMonthIndex]);

  return (
    <div className="flex flex-col gap-4 p-8 max-w-screen-lg mx-auto ">
      <Header />
      <MonthSelector selectedMonthIndex={selectedMonthIndex} setSelectedMonthIndex={setSelectedMonthIndex} months={months} />
      <DaysHeader days={days} />
      <Lanes lanes={lanes} days={days.length} selectedMonthIndex={selectedMonthIndex} months={months} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
