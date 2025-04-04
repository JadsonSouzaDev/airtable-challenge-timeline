import { ChevronLeft, ChevronRight } from "lucide-react";

const MonthSelector = ({ selectedMonthIndex, setSelectedMonthIndex, months }) => {
  return (
    <div className="flex flex-row gap-x-8 items-center justify-center ">
      <div className="flex w-[300px] flex-row gap-x-4 items-center justify-between">
        <button
          className="disabled:opacity-50"
          disabled={selectedMonthIndex === 0}
          onClick={() => setSelectedMonthIndex(selectedMonthIndex - 1)}
        >
          <ChevronLeft />
        </button>
        <h3 className="text-xl uppercase font-bold">
          {months[selectedMonthIndex].label}
        </h3>
        <button
          className="disabled:opacity-50"
          disabled={selectedMonthIndex === months.length - 1}
          onClick={() => setSelectedMonthIndex(selectedMonthIndex + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
