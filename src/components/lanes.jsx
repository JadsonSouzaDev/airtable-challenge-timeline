import { Lane } from "./index";
import { useState } from "react";
const Lanes = ({ lanes, days, selectedMonthIndex, months }) => {
  const [selectedLane, setSelectedLane] = useState(null);

  return (
    <div className="flex flex-col gap-4 z-10">
      {lanes.map((lane, key) => (
        <div
          key={key}
          className="grid gap-x-1"
          style={{ gridTemplateColumns: `repeat(${days}, 1fr)` }}
        >
          {lane.map((item) => (
            <Lane
              key={item.id}
              item={item}
              selectedMonthIndex={selectedMonthIndex}
              months={months}
              isSelected={selectedLane?.id === item.id}
              setSelectedLane={setSelectedLane}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lanes;
