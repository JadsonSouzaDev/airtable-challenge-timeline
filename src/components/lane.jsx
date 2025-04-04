import { getDateUTC } from "../assignLanes";
import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

const Lane = ({
  item,
  selectedMonthIndex,
  months,
  isSelected,
  setSelectedLane,
}) => {
  const [name, setName] = useState(item.name);
  const [isHovering, setIsHovering] = useState(false);
  const laneRef = useRef(null);
  const start = getDateUTC(item.start);
  const end = getDateUTC(item.end);
  let startModified = false;
  let endModified = false;

  // If the start date is not in the selected month, set it to the first day of the month
  if (
    start.getMonth() !== months[selectedMonthIndex].month ||
    start.getFullYear() !== months[selectedMonthIndex].year
  ) {
    start.setDate(1);
    start.setMonth(months[selectedMonthIndex].month);
    startModified = true;
  }

  // If the end date is not in the selected month, set it to the last day of the month
  if (
    end.getMonth() !== months[selectedMonthIndex].month ||
    end.getFullYear() !== months[selectedMonthIndex].year
  ) {
    const newDay = new Date(
      months[selectedMonthIndex].year,
      months[selectedMonthIndex].month + 1,
      0
    ).getDate();
    end.setDate(newDay);
    end.setMonth(months[selectedMonthIndex].month + 1);
    endModified = true;
  }

  // Calculate the duration of the event in days
  const duration = end - start;
  const durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24));

  // Calculate the grid column start and end
  const gridColumnStart = start.getDate();
  const gridColumnEnd =
    durationInDays > 1
      ? gridColumnStart + durationInDays + 1
      : gridColumnStart + 1;

  // Handle click outside
  useEffect(() => {
    if (!isSelected) return;

    const handleClickOutside = (event) => {
      if (laneRef.current && !laneRef.current.contains(event.target)) {
        setSelectedLane(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelected, setSelectedLane]);

  // Handle key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelectedLane(null);
    }
  };

  return (
    <div
      ref={laneRef}
      key={item.id}
      onClick={() => setSelectedLane(item)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`cursor-pointer border-2 flex flex-row items-center justify-center gap-4 px-2 h-10 relative ${
        isSelected
          ? "bg-blue-500 border-blue-500 text-white"
          : "bg-white border-blue-300 text-blue-500 hover:bg-blue-50 hover:border-blue-100"
      } ${!startModified ? "rounded-s-lg" : ""} ${
        !endModified ? "rounded-e-lg" : ""
      }`}
      style={{ gridColumnStart, gridColumnEnd }}
    >
      {!isSelected && (
        <>
          <span className="text-xs truncate font-semibold">{name}</span>
          {isHovering && !isSelected && (
            <button
              className="absolute right-1 bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLane(item);
              }}
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </>
      )}
      {isSelected && (
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-xs font-semibold"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </div>
  );
};

export default Lane;
