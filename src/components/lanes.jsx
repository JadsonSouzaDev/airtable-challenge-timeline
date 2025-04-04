import { Lane } from "./index";

const Lanes = ({ lanes, days, selectedMonthIndex, months }) => {
  return (
    <div className="flex flex-col gap-4">
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lanes;
